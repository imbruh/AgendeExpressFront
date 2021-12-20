import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TextoLoginComponent } from './texto-login/texto-login.component';

@NgModule({
    declarations: [MenuComponent, TextoLoginComponent],
    exports: [
        MenuComponent,
        TextoLoginComponent
      ],
    imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
})
export class LayoutsModule { }
