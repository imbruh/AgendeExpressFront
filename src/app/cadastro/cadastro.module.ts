import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { ListagemClienteComponent } from './listagem-cliente/listagem-cliente.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutsModule } from '../layouts/layouts.module';


@NgModule({
  declarations: [
    CadastroClienteComponent,
    CadastroEmpresaComponent,
    ListagemClienteComponent,
    ListagemEmpresaComponent
  ],
  exports: [
    ListagemClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutsModule
  ]
})
export class CadastroModule { }
