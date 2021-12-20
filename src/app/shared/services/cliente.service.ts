import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cliente} from "../model/cliente";
import {Observable} from "rxjs";
import { ClienteAtualizarDTO } from '../model/clienteAtualizarDTO';
import { ClienteCadastrarDTO } from '../model/clienteCadastrarDTO';
import { ClienteLoginDTO } from '../model/clienteLoginDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  URL_USUARIO = 'https://agendeexpressback.herokuapp.com/cliente';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'key': 'x-api-key',
        'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  cadastrarCliente(clienteCadastrarDTO: ClienteCadastrarDTO): Observable<Cliente> {
    
    return this.httpClient.post<Cliente>(`${this.URL_USUARIO}/cadastrar`, clienteCadastrarDTO, this.httpOptions);
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIO}/apagar/?id=${id}`, this.httpOptions)
  }

  pesquisarPorID(id: Number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.URL_USUARIO}/pesquisarPorId?id=${id}`, this.httpOptions);
  }

  atualizar(clienteAtualizarDTO: ClienteAtualizarDTO): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.URL_USUARIO}/atualizar`, clienteAtualizarDTO, this.httpOptions);
  }

  apagarConta(id:Number): Observable<Boolean> {
    return this.httpClient.delete<Boolean>(`${this.URL_USUARIO}/apagar?id=${id}`, this.httpOptions);
  }

  login(clienteLogin: ClienteLoginDTO): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${this.URL_USUARIO}/login`, clienteLogin)
  }

  testeMsg(): Observable<Array<string>> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'key': 'x-api-key',
          'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
      })
    };

    return this.httpClient.get<Array<string>>('http://chatrabbitmq.herokuapp.com/receber', httpOptions)
  }

  tesMsgEnviar(msg: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'key': 'x-api-key',
          'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
      })
    };

    return this.httpClient.post<void>(`http://chatrabbitmq.herokuapp.com/enviar?msg=${msg}`, httpOptions)
  } 
}
