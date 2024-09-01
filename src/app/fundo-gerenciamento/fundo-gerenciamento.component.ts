import { Component, OnInit } from '@angular/core';
import { ServicoFundo } from './fundo.service';
import { FundoDto } from './fundo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fundo-gerenciamento',
  templateUrl: './fundo-gerenciamento.component.html',
  styleUrls: ['./fundo-gerenciamento.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FundoGerenciamentoComponent implements OnInit {
  fundos: FundoDto[] = [];
  fundoSelecionado?: FundoDto;
  valorPatrimonio: number = 0;
  codigoPesquisa: string = '';
  atualizacaoPatrimonioVisivel: boolean = false;
  mensagemRetorno: string | null = null;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  constructor(private servicoFundo: ServicoFundo) { }

  ngOnInit(): void {
  }

  carregarFundos(): void {
    this.servicoFundo.obterFundos().subscribe(data => {
      this.fundos = data;
      this.atualizacaoPatrimonioVisivel = false;
    });
  }

  pesquisarFundo(): void {
    this.mensagemRetorno = ''
    this.mensagemErro = ''
    if (this.codigoPesquisa.trim()) {
      this.servicoFundo.obterFundoPorCodigo(this.codigoPesquisa).subscribe({
        next: (fundo) => {
          if (fundo) {
            this.fundos = [fundo];
          }
        },
        error: (erro) => {
          if (erro.status === 400) {
            this.mensagemErro = 'Fundo não encontrado.';
          } else {
            this.mensagemErro = 'Ocorreu um erro ao buscar o fundo.';
          }
          this.fundos = [];
        }
      });
    } else {
      this.mensagemErro = 'Por favor, insira um código para pesquisar.';
    }
  }

  selecionarFundo(fundo: FundoDto): void {
    this.fundoSelecionado = { ...fundo };
    this.atualizacaoPatrimonioVisivel = false;
  }

  prepararAtualizarPatrimonio(fundo: FundoDto): void {
    this.fundoSelecionado = fundo;
    this.valorPatrimonio = fundo.patrimonio || 0;
    this.atualizacaoPatrimonioVisivel = true;
  }

  atualizarFundo(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    if (this.fundoSelecionado) {
      this.servicoFundo.atualizarFundo(this.fundoSelecionado).subscribe({
        next: (response) => {
          this.mensagemSucesso = response;
          this.carregarFundos();
          this.fundoSelecionado = undefined;
          this.atualizacaoPatrimonioVisivel = false;
        },
        error: (erro) => {
          this.mensagemErro = erro.erro || 'Ocorreu um erro ao atualizar o fundo. Por favor, tente novamente.';;
        }
      });
    }
  }
  excluirFundo(codigo: string): void {
    this.servicoFundo.excluirFundo(codigo).subscribe(response => {
      alert(response);
      this.carregarFundos();
    });
  }

  atualizarPatrimonio(): void {
    if (this.fundoSelecionado) {
      this.servicoFundo.atualizarPatrimonio(this.fundoSelecionado.codigo, this.valorPatrimonio).subscribe(response => {
        alert(response);
        this.carregarFundos();
        this.atualizacaoPatrimonioVisivel = false;
      });
    }
  }
}
