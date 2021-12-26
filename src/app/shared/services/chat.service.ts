import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { MensagemDTO } from '../model/mensagemDTO';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    // webSocket: WebSocket = new WebSocket('ws://localhost:8080/chat');
    URL_CHAT = "http://localhost:8080"
    
  
    constructor(private httpClient: HttpClient) { }
  
    // public openWebSocket(){
    //    this.webSocket = new WebSocket('ws://localhost:8080/chat');
  
    //   this.webSocket.onopen = (event) => {
    //     console.log('Open: ', event);
    //   };
  
    //   this.webSocket.onmessage = (event) => {
    //     const chatMessageDto = JSON.parse(event.data);
    //     this.chatMessages.push(chatMessageDto);
    //   };
  
    //   this.webSocket.onclose = (event) => {
    //     console.log('Close: ', event);
    //   };
    // }
  
    // public sendMessage(chatMessageDto: MensagemDTO){
    //   this.webSocket.send(JSON.stringify(chatMessageDto));
    // }
  
    // public closeWebSocket() {
    //   this.webSocket.close();
    // }

    enviarMsg(msg: string): Observable<string>{
        return this.httpClient.post<string>(`${this.URL_CHAT}/enviar?msg=${msg}`,{});
    }
    receberMsgs(empresaId:number): Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.URL_CHAT}/receber?empresaId=${empresaId}`);
    }

    
}
