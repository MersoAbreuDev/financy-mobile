import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
 constructor() { }
  setLocalStorage(nome:string, item:any){
    localStorage.setItem(nome, item)
  }

  getLocalStorage(nome: string){
    return JSON.parse(localStorage.getItem(nome) || '{}')
  }

  removeLocalStorage(nome:string){
    localStorage.removeItem(nome);
  }
}
