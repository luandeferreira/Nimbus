import { Injectable } from '@angular/core';

declare const NG_APP_CHAVE_DE_API: string;

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  constructor() {}

  get apiKey(): string {
    // O @ngx-env/builder injeta as variáveis globalmente
    return NG_APP_CHAVE_DE_API || '';
  }
}
