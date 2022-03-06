const ws = new WebSocket('ws://localhost:3000')

ws.on('open',() => {
    ws.send('Hello Server!')
})

ws.on('message', data =>{
    console.log('Message from server',data)
})