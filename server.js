const WebSocket = require('ws')

// 웹소켓 서버 생성
const wss = new WebSocket.Server({port:3000})

// 클라이언트가 connection
wss.on('connection',ws => {
    
    // 메세지 받은 경우 호출
    ws.on('message',message =>{
        console.log('received: %s',message)
    })

    ws.send('something')
})