// 2) 웹소켓 서버 생성
const WebSocket = require('ws')

// Websocket 서버 생성 시, HTTP 서버 연결
// port는 별도로 지정 가능
const wss = new WebSocket.Server({
    server : HTTPServer,
    // port 생략 시 http 서버와 동일 포트 사용
    // ???????다른 포트를 사용하는 이유는 뭐지..????
    // port : 3000 
})

// 클라이언트가 connection
wss.on('connection',ws => {
    
    if(ws.readyState === ws.OPEN){
        ws.send(`클라이언트 접속을 환영합니다. from wss`)
    }

    // 메세지 받은 경우 호출
    ws.on('message',message =>{
        console.log('received: %s',message)
    })

    ws.on('error',(error) => {
        console.log('연결 에러 발생')
    })

    ws.on('close', () =>{
        console.log(`클라이언트 웹소켓 연결 종료`)
    })

    ws.send('something')
})