import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/model/cliente';
import { Empresa } from 'src/app/shared/model/empresa';
import { HorarioDTO } from 'src/app/shared/model/horarioDTO';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { HorarioService } from 'src/app/shared/services/horario.service';
import { EmpresaService } from 'src/app/shared/services/empresa.service';
import { MesEnum } from 'src/app/shared/model/enum/mes.enum';
import { DiaSemanaEnum } from 'src/app/shared/model/enum/diaSemana.enum';

@Component({
  selector: 'app-listar-horario',
  templateUrl: './listar-horario.component.html',
  styleUrls: ['./listar-horario.component.css']
})
export class ListarHorarioComponent implements OnInit {
  cliente =  new Cliente();
  empresa = new Empresa();
  hoje = new Date();
  horarios: Array<HorarioDTO> = [];
  logado: any;
  dataHojeFormatada = "";
  clienteLogado=true;
  data: any;

  constructor(private clienteService: ClienteService, private empresaService: EmpresaService, public dialog: MatDialog, private dialogService: DialogService, private horarioService: HorarioService, public dialogRef: MatDialogRef<DialogService>, private roteador: Router) {}

  openDialogMensagem() {
    this.dialogService.openDialogMensagens();
  }

  openDialogCadastroHorario() {
    this.dialogService.openDialogCadastrarHorario();
  }

  ngOnInit(): void {
    
    this.dataHoje();
    // this.listarHorariosPorDia();
    let clienteLogadoId = localStorage.getItem("cliente");
    let empresaId = localStorage.getItem("empresa");
    let empresaLogadaId = localStorage.getItem("empresaLogada");
    if (clienteLogadoId != undefined && clienteLogadoId != "0"){
        this.clienteService.pesquisarPorID(parseInt(clienteLogadoId)).subscribe(
            cliente =>{
                this.logado=cliente;
                this.clienteLogado=true;
            }
        )
    }else if (empresaLogadaId != undefined && empresaLogadaId != "0"){
        this.empresaService.pesquisarPorID(parseInt(empresaLogadaId)).subscribe(
            empresa =>{
                this.empresa=empresa
                this.clienteLogado=false;
            }
        )
      }else{
        this.roteador.navigate([""])
    }

    if(clienteLogadoId != undefined && clienteLogadoId != "0"){
      if(empresaId != undefined){
        this.horarioService.listarHorarioPorDia(this.horarioService.formatarDataHora(this.hoje), parseInt(empresaId)).subscribe(
          horario => {
            console.log(horario)
            this.horarios = horario;
            for (let hr of this.horarios){
                if(hr.diaSemana!=undefined){          
                    hr.diaSemana=DiaSemanaEnum[hr.diaSemana];

                }
            }
        }
        )
      }
    }
    else if(empresaLogadaId != undefined && empresaLogadaId != "0") {
      if(empresaLogadaId != undefined){
        this.horarioService.listarHorarioPorDia(this.horarioService.formatarDataHora(this.hoje), parseInt(empresaLogadaId)).subscribe(
          horario => {
            console.log(horario)
            this.horarios = horario;
            for (let hr of this.horarios){
                if(hr.diaSemana!=undefined){          
                    hr.diaSemana=DiaSemanaEnum[hr.diaSemana];

                }
            }
        }
        )
      }
    }
  }

  dataHoje(){
    let dia = this.hoje.getDate()<10 ? "0"+this.hoje.getDate() : this.hoje.getDate();
    let mes = MesEnum[this.hoje.getMonth()];
    this.dataHojeFormatada = `${dia} de ${mes}, ${this.hoje.getFullYear()}`
  }

  listarHorarioPorDia() {
    let empresaId = localStorage.getItem("empresa");
    if(empresaId != undefined)
      this.horarioService.listarHorarioPorDia(this.horarioService.formatarDataHora(this.data), parseInt(empresaId)).subscribe(
        horario => {
          this.horarios = horario;
          for (let hr of this.horarios){
            if(hr.diaSemana!=undefined){          
                hr.diaSemana=DiaSemanaEnum[hr.diaSemana];
            }
          }
        }
      )
  }

  openDialogCancelarHorario() {
    this.dialogService.openDialogCancelarHorario();
  }
}
