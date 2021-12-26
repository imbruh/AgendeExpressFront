import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../shared/model/cliente';
import { Empresa } from '../shared/model/empresa';
import { ChatService } from '../shared/services/chat.service';
import { ClienteService } from '../shared/services/cliente.service';
import { EmpresaService } from '../shared/services/empresa.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  cliente = new Cliente();
  empresa = new Empresa();
  chatMessages:any = [];
  constructor(public webSocketService: ChatService, private clienteService: ClienteService, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    let clienteLogado = localStorage.getItem("cliente");
    let empresa = localStorage.getItem("empresa");
    let empresaLogada = localStorage.getItem("empresaLogada");
    if (clienteLogado != undefined && clienteLogado != "0"){
        this.clienteService.pesquisarPorID(parseInt(clienteLogado)).subscribe(
            cliente => {
                this.cliente = cliente;
                
            }
        )
    }
    if (empresa != undefined && empresa != "0"){
        this.empresaService.pesquisarPorID(parseInt(empresa)).subscribe(
            empresa => {
                this.empresa = empresa
                this.receivedMessage();
            }
        ) 
    }   
    if (empresaLogada != undefined && empresaLogada != "0"){
        this.empresaService.pesquisarPorID(parseInt(empresaLogada)).subscribe(
            empresa => {
                this.empresa = empresa
                this.receivedMessage();
            }
        ) 
    }  

  }

  sendMessage(sendForm: NgForm) {
    this.webSocketService.enviarMsg(`${this.cliente.id != undefined ? this.cliente.nome : this.empresa.nome}/${this.empresa.id}/${sendForm.value.message}`).subscribe(
        () => {
            sendForm.controls['message'].reset();
            this.receivedMessage();
            
        }
    )
   }
   
    receivedMessage(): void{
        if (this.empresa.id){
            this.webSocketService.receberMsgs(this.empresa.id).subscribe(
            msgs => {
                this.chatMessages = msgs;
            }
            )
        }
        
    }
    
}