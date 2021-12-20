import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ChatComponent } from 'src/app/chat/chat.component';
import { CadastrarHorarioComponent } from 'src/app/horario/cadastrar-horario/cadastrar-horario.component';
import { CancelarHorarioComponent } from 'src/app/horario/cancelar-horario/cancelar-horario.component';
import { DialogBatePapoComponent } from 'src/app/horario/dialog-bate-papo/dialog-bate-papo.component';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ChatComponent,CadastrarHorarioComponent>, public dialogRef2: MatDialogRef<CancelarHorarioComponent>) { }

  openDialogMensagens(): void {
    this.dialog.open(ChatComponent, {
    });
  }

  openDialogCadastrarHorario(): void {
    this.dialog.open(CadastrarHorarioComponent, {
    });
  }

  openDialogCancelarHorario(): void {
    this.dialog.open(CancelarHorarioComponent, {
      width: '30%'
    });
  }

}