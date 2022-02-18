const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }

    mongoose.connect(
      // 몽고DB의 기본설정 포트값인 :27017로 입력,
        // 포트번호는 Compass 툴에서도 확인가능
      // 상대경로인 '/til'을 도메인 경로로 입력 시
        // 해당 파일을 기준으로 DB를 CRUD한다.
      "mongodb://localhost:27017/til",
      {
        dbName: "til"
      },
      error => {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.log("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
  });

  //사용할 스키마를 설정
  require("./user");
  require("./board");
};
