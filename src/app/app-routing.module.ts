import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { FundoGerenciamentoComponent } from './fundo-gerenciamento/fundo-gerenciamento.component';
import { FundoCadastroComponent } from './fundo-cadastro/fundo-cadastro.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {Interceptor} from './interceptors/interceptor'

export const routes: Routes = [
  { path: 'fundo-gerenciamento', component: FundoGerenciamentoComponent },
  { path: 'fundo-cadastro', component: FundoCadastroComponent },
  { path: 'fundo-gerenciamento', redirectTo: '/fundo-gerenciamento', pathMatch: 'full' },
  { path: 'fundo-cadastro', redirectTo: '/fundo-cadastro', pathMatch: 'full' },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],  exports: [RouterModule]
})
export class AppRoutingModule { }
