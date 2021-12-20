import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HorarioCadastrarDTO } from '../model/horarioCadastrarDTO';
import { HorarioDTO } from '../model/horarioDTO';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  
  URL_HORARIO = 'http://agendeexpressback.herokuapp.com/horario';

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

constructor(private httpClient: HttpClient) { }

  formatarDataHora(data: Date): string {
    let ano = data.getFullYear();
    let mes = data.getMonth()+1 < 10 ? "0" + data.getMonth()+1 : data.getMonth()+1;
    let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
    return `${ano}-${mes}-${dia}T00:00:00`;
  }

  formatarHora(horarios:Array<string>): Array<string>{
    let horasFormatadas = [];
    for(let hr of horarios){
        if (parseInt(hr) < 10){
          let horaFormatada = "0"+hr;  
          hr=horaFormatada;
        }
        horasFormatadas.push(hr)
    }
    return horasFormatadas;
  }

  listarHorarioPorDia(data: String, idEmpresa: number): Observable<HorarioDTO[]>{
    return this.httpClient.get<HorarioDTO[]>(`${this.URL_HORARIO}/listar?dataHora=${data}&idEmpresa=${idEmpresa}`, this.httpOptions);
  }

  filtrarHorarioDisponivel(data: string, idEmpresa: number): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.URL_HORARIO}/filtrar-horario?data=${data}&idEmpresa=${idEmpresa}`, this.httpOptions);
  }

  cadastrarHorario(horarioCadastrarDTO: HorarioCadastrarDTO): Observable<void>{
    return this.httpClient.post<void>(`${this.URL_HORARIO}/cadastrar`, horarioCadastrarDTO, this.httpOptions);
  }

  buscarHorarioPorCliente(idCliente: number, idEmpresa: number): Observable<HorarioDTO[]> {
    return this.httpClient.get<HorarioDTO[]>(`${this.URL_HORARIO}/buscar-horario-por-cliente?idCliente=${idCliente}&idEmpresa=${idEmpresa}`, this.httpOptions);
  }

  cancelarHorario(dataHora: string, idEmpresa: number, idCliente: number): Observable<HorarioDTO[]> {
    return this.httpClient.delete<HorarioDTO[]>(`${this.URL_HORARIO}/apagar-horario?dataHora=${dataHora}&idCliente=${idCliente}&idEmpresa=${idEmpresa}`, this.httpOptions)
  }
}
