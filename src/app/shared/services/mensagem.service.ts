import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private snackBar: MatSnackBar) { }

  snackSucesso(mensagem: string): void {
    this.mensagemSnackBar(mensagem, ['success'])
  }
  snackErro(mensagem: string): void {
    this.mensagemSnackBar(mensagem, ['error'])
  }
  snackAviso(mensagem: string): void {
    this.mensagemSnackBar(mensagem, ['warning'])
  }
  snackInfo(mensagem: string): void {
    this.mensagemSnackBar(mensagem, ['info'])
  }

  private mensagemSnackBar(mensagem: string, tipoDoSnackBar: Array<string> ): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.politeness = 'assertive';
    snackBarConfig.duration = 5000;
    snackBarConfig.panelClass=tipoDoSnackBar;

    this.snackBar.open(mensagem,"X",snackBarConfig);
  }
}
