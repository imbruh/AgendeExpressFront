import { Injectable } from '@angular/core';
import {Empresa} from "../model/empresa";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { EmpresaAtualizarDTO } from '../model/empresaAtualizarDTO';
import { EmpresaLoginDTO } from '../model/empresaLoginDTO';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  URL_EMPRESA = 'https://agende-express-back.herokuapp.com/empresa';

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

  cadastrarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(`${this.URL_EMPRESA}/cadastrar`, empresa, this.httpOptions);
  }

  listar(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(`${this.URL_EMPRESA}/listar`, this.httpOptions);
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.URL_EMPRESA}/apagar?id=${id}`, this.httpOptions)
  }

  atualizar(empresaAtualizarDTO: EmpresaAtualizarDTO): Observable<Empresa> {
    return this.httpClient.put<Empresa>(`${this.URL_EMPRESA}/atualizar`, empresaAtualizarDTO, this.httpOptions);
  }

  pesquisarPorID(id: Number): Observable<EmpresaAtualizarDTO> {
    return this.httpClient.get<EmpresaAtualizarDTO>(`${this.URL_EMPRESA}/pesquisarPorId?id=${id}`, this.httpOptions);
  }

  login(empresaLogin: EmpresaLoginDTO): Observable<Empresa> {
    return this.httpClient.post<Empresa>(`${this.URL_EMPRESA}/login`, empresaLogin, this.httpOptions)
  }
}
