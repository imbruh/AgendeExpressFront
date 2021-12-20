import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../shared/model/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-listagem-cliente',
  templateUrl: './listagem-cliente.component.html',
  styleUrls: ['./listagem-cliente.component.css']
})
export class ListagemClienteComponent implements OnInit {
  cliente!: Cliente[];
  mostrarColunas = ['Id', 'Nome','Usuario', 'Email',  'Telefone']

  constructor( private clienteService : ClienteService, private roteador: Router) {
  }

  ngOnInit(): void {
  }
/*
  filtrar(value: string): void {
    this.cliente.filter = value.trim().toLowerCase();
  }
*/

  editar(cliente: Cliente): void {
    this.roteador.navigate(['cadastro-cliente', cliente.id]).then(_r => {
      return this.clienteService;
    })
  }


  apagar(id: number): void {
    this.clienteService.remover(id).subscribe(
      _remover => {
        const index = this.cliente.findIndex(cliente => cliente.id === id);
        if (index > -1) {
          this.cliente.splice(index, 1);
        }
      }
    )
  }
}
