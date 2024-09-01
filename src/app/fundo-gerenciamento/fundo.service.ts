import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FundoDto } from './fundo.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoFundo {
  private apiUrl = 'https://localhost:44378/api/fundo';

  constructor(private http: HttpClient) { }

  obterFundos(): Observable<FundoDto[]> {
    return this.http.get<FundoDto[]>(this.apiUrl);
  }

  obterFundoPorCodigo(codigo: string): Observable<FundoDto> {
    return this.http.get<FundoDto>(`${this.apiUrl}/${codigo}`);
  }

  incluirFundo(fundo: FundoDto): Observable<string> {
    return this.http.post<string>(this.apiUrl, fundo,{responseType: 'text' as 'json'});
  }

  atualizarFundo(fundo: FundoDto): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${fundo.codigo}`, fundo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  excluirFundo(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }

  atualizarPatrimonio(codigo: string, valor: number): Observable<string> {
    console.log('patriminio', valor);
    return this.http.put<string>(`${this.apiUrl}/${codigo}/patrimonio`, valor);
  }
}
