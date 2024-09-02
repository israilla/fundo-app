import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {Interceptor} from './interceptors/interceptor'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FundoCadastroComponent } from './fundo-cadastro/fundo-cadastro.component';
import { FundoGerenciamentoComponent } from './fundo-gerenciamento/fundo-gerenciamento.component';

export const routes: Routes = [
  { path: 'fundo-gerenciamento', component: FundoGerenciamentoComponent },
  { path: 'fundo-cadastro', component: FundoCadastroComponent },
  { path: 'fundo-gerenciamento', redirectTo: '/fundo-gerenciamento', pathMatch: 'full' },
  { path: 'fundo-cadastro', redirectTo: '/fundo-cadastro', pathMatch: 'full' },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    provideNgxMask()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
