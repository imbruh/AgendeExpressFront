import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmpresaService} from "../../shared/services/empresa.service";
import {Empresa} from "../../shared/model/empresa";
import { EmpresaAtualizarDTO } from 'src/app/shared/model/empresaAtualizarDTO';
import {MensagemService} from "../../shared/services/mensagem.service";

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  empresa: Empresa;
  empresaAtualizar: EmpresaAtualizarDTO;
  empresas: Array<Empresa>;

  constructor(private empresaService: EmpresaService,private rotaAtual: ActivatedRoute, private roteador: Router, private mensagemService: MensagemService) {
    this.empresa = new Empresa();
    this.empresas = new Array<Empresa>();
    this.empresaAtualizar = new EmpresaAtualizarDTO();
    if (this.rotaAtual.snapshot.paramMap.has('id')) {
      const idParaEdicao = Number(this.rotaAtual.snapshot.paramMap.get('id'));
      this.empresaService.pesquisarPorID(idParaEdicao).subscribe(
        empresaRetornado => this.empresaAtualizar = empresaRetornado
      );

    }
  }

  ngOnInit(): void {

  }

  listar() {
    this.empresaService.listar().subscribe(
      empresas => {
        this.empresas = empresas;
      }
    )
  }

  cadastrarEmpresa (): void{
    console.log(this.empresa)
    if(this.empresa.nome==undefined || this.empresa.cnpj==undefined || this.empresa.senha==undefined) {
      this.mensagemService.snackAviso('Preencha todos os campos');
    }
    else{
      this.empresaService.cadastrarEmpresa(this.empresa).subscribe(
        empresaCadastrada =>  {
          if(empresaCadastrada!=undefined){
            if(empresaCadastrada.id != undefined){
              localStorage.setItem("empresa",empresaCadastrada.id.toString());
              this.roteador.navigate(['inicio'])
            }
          }
          else{
            this.empresa = new Empresa();
            this.mensagemService.snackErro('Credenciais ja usadas no sistema')
          }
        }
      );
    }
  }

  atualizarEmpresa(){
    this.empresaService.atualizar(this.empresaAtualizar).subscribe(()=>{
      this.mensagemService.snackSucesso('Empresa Atualizada')
      this.roteador.navigate(['inicio'])
    })
}

}
