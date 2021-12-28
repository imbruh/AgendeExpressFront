import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    URL_CHAT = "http://localhost:8080"
    
    constructor(private httpClient: HttpClient) { }

    enviarMsg(msg: string): Observable<string>{
        return this.httpClient.post<string>(`${this.URL_CHAT}/enviar?msg=${msg}`,{});
    }
    receberMsgs(empresaId:number): Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.URL_CHAT}/receber?empresaId=${empresaId}`);
    }

    
}
