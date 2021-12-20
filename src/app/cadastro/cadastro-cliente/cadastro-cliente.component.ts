import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../shared/model/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ClienteCadastrarDTO } from 'src/app/shared/model/clienteCadastrarDTO';
import { ClienteAtualizarDTO } from 'src/app/shared/model/clienteAtualizarDTO';
import { EmpresaService } from 'src/app/shared/services/empresa.service';
import {MensagemService} from "../../shared/services/mensagem.service";

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  cliente: ClienteCadastrarDTO;
  clientes: Array<ClienteCadastrarDTO>;
  clienteAtualizar:ClienteAtualizarDTO;
  empresas:any = []

  constructor(private clienteService: ClienteService, private empresaService: EmpresaService, private rotaAtual: ActivatedRoute, private roteador: Router, private mensagemService: MensagemService) {
    this.cliente = new ClienteCadastrarDTO();
    this.clientes = new Array<ClienteCadastrarDTO>();
    this.clienteAtualizar = new ClienteAtualizarDTO;
    if (this.rotaAtual.snapshot.paramMap.has('id')) {
      const idParaEdicao = Number(this.rotaAtual.snapshot.paramMap.get('id'));
      this.clienteService.pesquisarPorID(idParaEdicao).subscribe(
        clienteRetornado => this.clienteAtualizar = clienteRetornado
      );
    }
  }

  ngOnInit(): void {
    this.clienteService.tesMsgEnviar('aaaaa2').subscribe(
      ()=> {}
    );
    
    this.clienteService.testeMsg().subscribe(
      msg => {
        console.log(msg)
      }
    )

    this.empresaService.listar().subscribe(
      empresas =>{
        this.empresas = empresas
      })
  }

  cadastrarCliente (): void{
    if(this.cliente.nome==undefined || this.cliente.email==undefined || this.cliente.senha==undefined) {
      this.mensagemService.snackAviso('Preencha todos os campos');
    }
    else{
      let todasEmpresas: any = [];
      this.empresaService.listar().subscribe(
        empresa => {
          todasEmpresas = empresa
        }
      )
      let empresaTemp : any = [];
      for(let empresa of todasEmpresas) {
        empresaTemp.push(empresa.id);
      }

      this.cliente.idEmpresa = empresaTemp;

      this.clienteService.cadastrarCliente(this.cliente).subscribe(
        clienteCadastrado =>  {
          if(clienteCadastrado!=undefined){
            if(clienteCadastrado.id != undefined){
              localStorage.setItem("cliente",clienteCadastrado.id.toString());
              this.roteador.navigate(['inicio'])
            }
          }
          else{
            this.cliente = new ClienteCadastrarDTO();
            this.mensagemService.snackErro('Credenciais ja usadas no sistema')
          }
        }

      );
    }

  }

  atualizarCliente(){
    this.clienteService.atualizar(this.clienteAtualizar).subscribe(()=>{
      this.mensagemService.snackSucesso('Cliente Atualizado')
      this.roteador.navigate(['inicio'])
    })
  }

}
