import { Component, OnInit } from '@angular/core';
import { HorarioDTO } from 'src/app/shared/model/horarioDTO';
import { HorarioService } from 'src/app/shared/services/horario.service';
import { MensagemService } from 'src/app/shared/services/mensagem.service';

@Component({
  selector: 'app-cancelar-horario',
  templateUrl: './cancelar-horario.component.html',
  styleUrls: ['./cancelar-horario.component.css']
})
export class CancelarHorarioComponent implements OnInit {

  horariosDoCliente: HorarioDTO[] = [];

  constructor(private horarioService: HorarioService, private mensagemService: MensagemService) { }

  ngOnInit() {
    this.buscarHorariosCliente();
  }

  buscarHorariosCliente() {
    let clienteId = localStorage.getItem("cliente");
    let empresaId = localStorage.getItem("empresa");

    if(clienteId != undefined && empresaId != undefined){
      this.horarioService.buscarHorarioPorCliente(parseInt(clienteId), parseInt(empresaId)).subscribe(
        horarios => {
          this.horariosDoCliente = horarios;
        }
      );
    }
  }

  cancelarHorario(horario: HorarioDTO) {
    let clienteId = localStorage.getItem("cliente");
    let empresaId = localStorage.getItem("empresa");

    if(clienteId != undefined && empresaId != undefined){
      this.horarioService.cancelarHorario(`${horario.ano}-${horario.mes}-${horario.dia}T${horario.hora}:00:00`, parseInt(empresaId), parseInt(clienteId)).subscribe(
        horarios => {
          this.horariosDoCliente = horarios;
          location.reload() 
        }
      )
    }
  }
}
