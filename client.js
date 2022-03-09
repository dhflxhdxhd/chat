// 3) websocket 클라이언트 객체 생성(연결)
const ws = new WebSocket('ws://localhost:5000')

ws.on('open',() => {
    ws.send('Hello Server!')
})

ws.on('message', data =>{
    console.log('Message from server',data)
})

ws.on('close',()=>{
    console.log('connection close')
})

ws.on('error',event => {
    console.log(event)
})

// 버튼 클릭 이벤트 처리
// 웹소켓 서버에게 메세지 보내기
let cnt = 1;
document.getElementById("btn_send").addEventListener('click',()=>{
    if(ws.readyState === ws.OPEN){
        ws.send(`cnt : ${cnt}`)
        cnt++;
    }else{
        alert("연결된 websocket server가 없습니다.")
    }
})

document.getElementById("btn_close").addEventListener('click',()=>{
    if(ws.readyState === ws.OPEN){
        ws.close();
    }else{
        alert("연결된 websocket server가 없습니다.")
    }
})