// 1) http 서버 생성(Express 모듈 사용)
const express = require("express")
const app = express();
const path = require("path")

app.use(express.static(path.join(__dirname,"src")))


const PORT= process.env.PORT || 5000;

const HTTPServer = app.listen(PORT,()=>console.log(`server is running ${PORT}`))
