import { Injectable } from '@angular/core';
import { MensagemDTO } from '../model/mensagemDTO';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    webSocket: WebSocket = new WebSocket('ws://localhost:8080/chat');
    chatMessages: MensagemDTO[] = [];
  
    constructor() { }
  
    public openWebSocket(){
      this.webSocket = new WebSocket('ws://localhost:8080/chat');
  
      this.webSocket.onopen = (event) => {
        console.log('Open: ', event);
      };
  
      this.webSocket.onmessage = (event) => {
        const chatMessageDto = JSON.parse(event.data);
        this.chatMessages.push(chatMessageDto);
      };
  
      this.webSocket.onclose = (event) => {
        console.log('Close: ', event);
      };
    }
  
    public sendMessage(chatMessageDto: MensagemDTO){
      this.webSocket.send(JSON.stringify(chatMessageDto));
    }
  
    public closeWebSocket() {
      this.webSocket.close();
    }

}
