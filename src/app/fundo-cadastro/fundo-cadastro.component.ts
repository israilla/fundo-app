import { Component, ViewChild } from '@angular/core';
import { ServicoFundo } from '../fundo-gerenciamento/fundo.service';
import { FundoDto } from '../fundo-gerenciamento/fundo.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-fundo-cadastro',
  templateUrl: './fundo-cadastro.component.html',
  styleUrls: ['./fundo-cadastro.component.css'],
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  standalone: true,
  providers: [provideNgxMask()],
})
export class FundoCadastroComponent {
  novoFundo: FundoDto = { codigo: '', nome: '', cnpj: '', codigoTipo: 0, patrimonio: 0, nomeTipo: '' };
  mensagemErro: string | null = null;
  mensagemSucesso: string | null = null;

  @ViewChild('fundoForm') fundoForm!: NgForm;

  constructor(private servicoFundo: ServicoFundo) { }

  incluirFundo(): void {
    this.servicoFundo.incluirFundo(this.novoFundo).subscribe({
      next: response => {
        this.mensagemErro = null;
        this.mensagemSucesso = response;
        this.novoFundo = { codigo: '', nome: '', cnpj: '', codigoTipo: 0, patrimonio: 0, nomeTipo: '' };
        this.fundoForm.resetForm()
      },
      error: erro => {
        this.mensagemSucesso = null;
        this.mensagemErro = erro.error || 'Ocorreu um erro ao adicionar o fundo. Por favor, tente novamente.';
      }
    });
  }
}
