import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }


 async showSuccess(message:string){
      await Toast.show({
        text: message,
        position:'top'
      });
  }

  async showError(message: string){
    await Toast.show({
      text: message,
      position:'top'
    });
  }
}
