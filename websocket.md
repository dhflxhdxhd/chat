# websocket 

[Node.js & WebSocket - Simple chat tutorial](https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61)

<aside>
💡 [JS] websocket 이용하여 채팅 기능 구현해보기

</aside>

# Websocket, 웹소켓이란

채팅, 게임, 주식 차트 등의 실시간 통신이 필요한 서비스를 구현하려면 HTTP프로토콜이 아닌 웹소켓 프로토콜을 사용하는 것이 좋다. 

http 프로토콜은 요청한대로 응답을 보내주는 단순한 프로토콜로 문서 전달에 효율적이어서 오늘날 가장 많이 사용된다. 하지만 문서 전달 이상의 것들이 필요로 하게되었고 http를 사용해서는 계속 메세지를 받기만하는 상황을 구현하기가 힘들게 되었다. 또한 http프로토콜은 매 요청, 응답마다 연결을 수립하고 끊기 떄문에 비효율적이었다. (웹소켓의 탄생)

http 프로토콜 통신 방식(흐름)

websocket 프로토콜 통신 방식

## 웹소켓 프로토콜이란

실시간 양방향 통신을 지원하며 한 번 연결이 수립되면 클라이언트와 서버 모두 자유롭게 데이터를 보낼 수 있다. 소켓을 연결하여 실시간 데이터를 sever ↔ 다수의 clients 주고받게 되었다.

**한 번 연결되면 연결을 끊지 않고 계속 유지한 상태로 클라이언트와 서버가 서로 데이터를 주고 받는다.** 

<aside>
❔ 실시간 데이터 송신 : Polling, Long Polling, Streaming

</aside>

http 프로토콜 → http or https(보안 강화)

웹소켓 프로토콜 → ws or wss(보안 강화)

웹소켓은 http를 이용하여 연결을 수립하며 연결이 된 이후에도 연결할 때 사용했던 포트인 80과 443포트를 사용한다. 연결 수립은 handshake를 통해 이루어지며 handshake 시 http를 이용한다. 

### websocket handshake

웹소켓은 Http로 handshake를 한 후 ws로 프로토콜을 변환하여 웹소켓 프레임을 통해 데이터를 전송한다. 

웹소켓은 full-duplex(양방향통신)을 지원하며 따라서 요청과 응답을 구분하지 않는다. 

![Untitled](%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%89%E1%85%A9%E1%84%8F%E1%85%A6%E1%86%BA%20%E1%84%90%2008b42/Untitled.png)

붉은 박스 : Opening handshake

노란 박스 : Data transfer

보라색 박스 : Closing handshake

Opening handshake

웹소켓 클라이언트에서 핸드쉐이크 요쳥(http upgrade)을 전송하고 이에 대한 응답으로 핸드쉐이크 응답을 밥는데, 이 때 응답 코드는 101이다. 101은 프로토콜 전환을 서버가 승인했음을 알리는 코드이다. 

Data transfer

핸드쉐이크를 통해 웹소켓 연결이 수립되면, 데이터 전송파트가 시작된다. 클라이언트와 서버가 message라는 개념으로 데이터를 주고 받는다. 여기서 message는 한 개 이상의 Frame으로 구성되어 있다. 

핸드쉐이크가 끝난 시점부터 서버와 클라이언트는 서로가 살아 있는지 확인하기 위해 heartbeat 패킷을 보내며, 주기정으로 ping을 보내 체크한다. 이는 서버와 클라이언트 양측에서 설정 가능하다

Closing handshake

클라이언트와 서버 모드 커넥션을 종료하기 위한 컨트롤 프레임을 전송할 수 있다. 컨트롤 프레임은 closing handshake를 시작하라는 특저한 컨트롤 시퀀스를 포함한 데이터를 가지고 있다. 위 그림에서는 서버가 커넥션을 종료한다는 프레임을 보내고, 클라이언트가 이에 대한 응답으로 Close 프레임을 전송한다. 그러면 웹소켓 연결이 종료된다. 종료 이후에 수신되는 데이터는 모두 버려진다. 

![Untitled](%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%89%E1%85%A9%E1%84%8F%E1%85%A6%E1%86%BA%20%E1%84%90%2008b42/Untitled%201.png)

Polling 방식(요청-응답방식)과 다르게 양방향으로 원할때 요청을 보낼 수 있으며 stateless한 HTTP에 비해 오버헤드가 적으므로 유용하게 사용할 수 있다.