const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");

const app = express();

const indexRouter = require("./routes/index");
const boardRouter = require("./routes/board");

app.set("port", 8080);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(() => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/contents", boardRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("서버 에러");
});
app.listen(app.get("port"), () => {
  console.log("8080포트에서 서버가 실행됩니다");
});
