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

  constructor(private servicoFundo: ServicoFundo) { }

  ngOnInit(): void {
  }

  onCarregarFundos(): void {
    this.carregarFundos();
  }

  carregarFundos(): void {
    this.servicoFundo.obterFundos().subscribe(data => {
      this.fundos = data;
      this.atualizacaoPatrimonioVisivel = false;
    });
  }

  onPesquisarFundo(): void {
    if (this.codigoPesquisa.trim()) {
      this.servicoFundo.obterFundoPorCodigo(this.codigoPesquisa).subscribe(fundo => {
        if (fundo) {
          this.fundos = [fundo];
        } else {
          this.fundos = [];
          alert('Fundo não encontrado.');
        }
      });
    } else {
      alert('Por favor, insira um código para pesquisar.');
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
    if (this.fundoSelecionado) {
      this.servicoFundo.atualizarFundo(this.fundoSelecionado).subscribe(response => {
        alert(response);
        this.carregarFundos();
        this.fundoSelecionado = undefined;
        this.atualizacaoPatrimonioVisivel = false;
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
