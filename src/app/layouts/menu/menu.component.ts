import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/model/cliente';
import { Empresa } from 'src/app/shared/model/empresa';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { EmpresaService } from 'src/app/shared/services/empresa.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cliente = new Cliente();
  empresa = new Empresa();
  logado:any;
  constructor(private clienteService:ClienteService, private empresaService:EmpresaService, private roteador: Router) { }

  ngOnInit() {
    let clienteLogadoId = localStorage.getItem("cliente");
    let empresaId = localStorage.getItem("empresa");
    let empresaLogadaId = localStorage.getItem("empresaLogada");
    if (clienteLogadoId != undefined && clienteLogadoId != "0" && empresaId != undefined && empresaId != "0"){
        this.clienteService.pesquisarPorID(parseInt(clienteLogadoId)).subscribe(
            cliente =>{
                if(cliente == undefined){
                    localStorage.setItem("cliente", "0");
                    // this.roteador.navigate([""])
                }
                this.cliente=cliente;
            }
        )

        this.empresaService.pesquisarPorID(parseInt(empresaId)).subscribe(
            empresa =>{
                this.empresa=empresa
            }
        )
    }else if (empresaLogadaId != undefined && empresaLogadaId != "0"){
        this.empresaService.pesquisarPorID(parseInt(empresaLogadaId)).subscribe(
            empresa =>{
                if(empresa == undefined){
                    localStorage.setItem("empresaLogada", "0");
                    // this.roteador.navigate([""])
                }
                this.empresa=empresa
            }
        )
    }else{
        this.roteador.navigate([""])
    }
    
  }

  
  editar(){
    if(this.cliente.id!=undefined){
        this.roteador.navigate(['cadastro-cliente', this.cliente.id]).then(_r => {
          })
    }
    else{
        this.roteador.navigate(['cadastro-empresa', this.empresa.id]).then(_r => {
          })
    }
}

  apagarConta(){
    let clienteLogado = localStorage.getItem("cliente")
    let empresaLogada = localStorage.getItem("empresaLogada")
    if(clienteLogado != undefined && clienteLogado!="0"){
      this.clienteService.apagarConta(parseInt(clienteLogado)).subscribe(
          contaApagada=>{
            if(contaApagada)
              this.logout()
          }
      )
    }    
    else{
      if(empresaLogada != undefined && empresaLogada!="0"){
        this.empresaService.remover(parseInt(empresaLogada)).subscribe(
          contaApagada=>{
            if(contaApagada)
              this.logout()
          }
        )
    }
  }

}
  logout(){
    localStorage.setItem("cliente","0")
    localStorage.setItem("empresa","0")
    localStorage.setItem("empresaLogada","0")
    this.roteador.navigate([""])
  }

}
