import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  tokenUpdated: EventEmitter<any> = new EventEmitter<string>()

  constructor() {
  }

  setToken(token: string): void {
    localStorage.setItem("api_token", token);
    this.tokenUpdated.emit(this.getToken())
  }

  clearToken(): void {
    localStorage.setItem("api_token", "");
    this.tokenUpdated.emit(this.getToken())
  }

  getToken(): string | null {
    return localStorage.getItem("api_token")
  }
}
