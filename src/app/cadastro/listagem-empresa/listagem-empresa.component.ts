import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Empresa} from "../../shared/model/empresa";
import {EmpresaService} from "../../shared/services/empresa.service";

@Component({
  selector: 'app-listagem-empresa',
  templateUrl: './listagem-empresa.component.html',
  styleUrls: ['./listagem-empresa.component.css']
})
export class ListagemEmpresaComponent implements OnInit {

  empresa!: Empresa[];
  mostrarColunas = ['Id', 'Nome','Usuario']

  constructor( private empresaService : EmpresaService, private roteador: Router) {
  }

  ngOnInit(): void {
    this.empresaService.listar().subscribe(
      dados => this.empresa =  dados
    );
  }
  /*
    filtrar(value: string): void {
      this.cliente.filter = value.trim().toLowerCase();
    }
  */

  editar(empresa: Empresa): void {
    this.roteador.navigate(['cadastro-cliente', empresa.id]).then(_r => {
      return this.empresaService;
    })
  }


  apagar(id: number): void {
    this.empresaService.remover(id).subscribe(
      _remover => {
        const index = this.empresa.findIndex(empresas => empresas.id === id);
        if (index > -1) {
          this.empresa.splice(index, 1);
        }
      }
    )
  }
}
