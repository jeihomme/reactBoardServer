//express
//서버를 만들기 위한 프레임워크
//NODEJS서버를 생성하는 일반적인 프레임워크
const express = require("express");
//express사용법
const app = express();

//cors
//교차 출처 리소스 공유, 교차 추철 자원 공유는
//웹페이지 상의 제한된 리소스를 최초 자원이 서비스된
//도메인 밖의 다른 도메인으로부터 요청할 수 있게 허용하는 구조
//주소(포트포함)이 다른 url을 접근 시 사용
const cors = require("cors");

//NodeJs에서 사용할 세션설정
//express 프레임워크에서 사용하는 session 모듈 사용
const session = require("express-session");

//DB를 사용하는 스키마설정( 폴더 설정 )
//현 플젝에서는 몽고DB를 사용중
//DB 시작 초기화
//"./schemas" 안에 있는 index.js파일에서 DB연결
const connect = require("./schemas");
connect();

//cors 설정값 정의
const corsOptions = {
  origin: true,
  credentials: true
};

//NodeJs에서 사용할 세션설정
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hamletshu",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

//cors 설정값 적용
//타 도메인에서 넘어오는 요청값을 받을 수 있게 처리하는 기능
//const corsOptions = {
//   origin: true,
//   credentials: true
// };
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Server.js에서 모든 작업을 할 수 있다
//하지만 파일을 추가하여 모든 작업들을 영역별로 분리하는 기능
// '/member', '/board'는 prefix url
app.use("/member", require("./routes/memberRouter"));
app.use("/board", require("./routes/boardRouter"));

//NodeJs의 리스닝 포드설정
//서버의 포트번호를 설정
//해당 설정이 없으면 서버실행 불가
app.listen(8080, () => {
  console.log("listen umm..umm..um...");
});
