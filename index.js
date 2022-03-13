// Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 4).

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.get('/',(req,res)=> {
    // res.send()는 한 번만
    // res.send()는 res.write()와 res.end()의 통합방식이기 때문에 한 번 밖에 사용 못함. 
    res.send('<h1>Hello world</h1>');
});

server.listen(3000, ()=>{
    console.log('listening on : 3000')
});