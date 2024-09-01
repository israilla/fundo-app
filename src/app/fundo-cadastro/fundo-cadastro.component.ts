// src/app/fundo-cadastro/fundo-cadastro.component.ts
import { Component } from '@angular/core';
import { ServicoFundo } from '../fundo-gerenciamento/fundo.service';
import { FundoDto } from '../fundo-gerenciamento/fundo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fundo-cadastro',
  templateUrl: './fundo-cadastro.component.html',
  styleUrls: ['./fundo-cadastro.component.css'],
  imports: [FormsModule,CommonModule],
  standalone: true,
})
export class FundoCadastroComponent {
  novoFundo: FundoDto = { codigo: '', nome: '', cnpj: '', codigoTipo: 0, patrimonio: 0, nomeTipo: '' };
  mensagemErro: string | null = null;
  mensagemSucesso: string | null = null;
  constructor(private servicoFundo: ServicoFundo) { }

  incluirFundo(): void {
    this.servicoFundo.incluirFundo(this.novoFundo).subscribe({
      next: response => {
        this.mensagemErro = null;
        this.mensagemSucesso = response;
        this.novoFundo = { codigo: '', nome: '', cnpj: '', codigoTipo: 0, patrimonio: 0, nomeTipo: '' };
      },
      error: err => {
        this.mensagemSucesso = null;
        this.mensagemErro = err.error || 'Ocorreu um erro ao adicionar o fundo. Por favor, tente novamente.';
        console.error('Erro ao adicionar fundo:', err);
      }
    });
  }

  isFormValid(): boolean {
    return this.novoFundo.codigo !== '' &&
           this.novoFundo.nome !== '' &&
           this.novoFundo.cnpj !== '' &&
           this.novoFundo.codigoTipo !== 0 &&
           this.novoFundo.patrimonio !== 0 &&
           this.novoFundo.nomeTipo !== '';
  }
}
