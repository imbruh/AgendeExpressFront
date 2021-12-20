import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/shared/services/horario.service';
import { HorarioCadastrarDTO } from 'src/app/shared/model/horarioCadastrarDTO';
import { Router } from '@angular/router';
import {MensagemService} from "../../shared/services/mensagem.service";
import {HorarioDTO} from "../../shared/model/horarioDTO";
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cadastrar-horario',
  templateUrl: './cadastrar-horario.component.html',
  styleUrls: ['./cadastrar-horario.component.css']
})
export class CadastrarHorarioComponent implements OnInit {
  horario!: HorarioDTO;
  horariosDisponiveis: Array<String> = [];
  data = new Date();
  hora = '';
  cliente = new Cliente()

  constructor(private horarioService: HorarioService, private clienteService: ClienteService, private roteador: Router, private mensagemService: MensagemService) { }

  ngOnInit() {
    this.listarHorariosDisponiveis();
    let clienteLogadoId = localStorage.getItem("cliente");
    if (clienteLogadoId != undefined && clienteLogadoId != "0"){
        this.clienteService.pesquisarPorID(parseInt(clienteLogadoId)).subscribe(
            cliente =>{
                this.cliente=cliente;
            }
        )
      }else{
          this.roteador.navigate([""])
      }
    }

  listarHorariosDisponiveis() {
    let empresaLogadaId = localStorage.getItem("empresa");
    if(empresaLogadaId != undefined){
      console.log(this.data)
    this.horarioService.filtrarHorarioDisponivel(this.horarioService.formatarDataHora(this.data), parseInt(empresaLogadaId)).subscribe(
      horarios => {
        this.horariosDisponiveis = this.horarioService.formatarHora(horarios),
        console.log(this.horariosDisponiveis)
      }
    );
    }
  }

  alterarHora(hora: any) {
    this.hora = hora;
  }

  cadastrar() {
    let dataFormatada = this.horarioService.formatarDataHora(this.data);
    let dataHora = dataFormatada.slice(0,11) 

    dataHora += parseInt(this.hora) < 10 ? '0' + parseInt(this.hora.slice(0,2)): parseInt(this.hora.slice(0,2));
    dataHora += ':00:00';
    let horarioDTO = new HorarioCadastrarDTO();
    horarioDTO.dataHora = dataHora;
    horarioDTO.idCliente = this.cliente.id;
    let empresaLogada = localStorage.getItem("empresa");
    if(empresaLogada != undefined){
      horarioDTO.idEmpresa = parseInt(empresaLogada);
    }
   
    this.horarioService.cadastrarHorario(horarioDTO).subscribe(
      horario => {
          location.reload()     
      }
    );
  }
}

