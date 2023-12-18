import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { LoginUser } from 'src/interfaces/login-user';
import { LocalStorageService } from 'src/services/localStorage/local-storage.service';
import { LoginService } from 'src/services/login/login.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 form!: FormGroup;

  posicao:string = 'top';



  constructor(private fb: FormBuilder,
    private loginServiceApi: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private utilsService: UtilsService,
    private loadingCtrl: LoadingController){}



  ngOnInit(){
    this.initForms();

  }

  initForms(){
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    })
  }

  getValueControl(form: FormGroup, control: string){
    return form.controls[control].value;
  }

  createdPayloadLogin(
    email = this.getValueControl(this.form,'email'),
    senha = this.getValueControl(this.form, 'senha')
  ){
    const payload = {
      email,
      senha
    }
    return payload;
  }

  isValidForm(){
    return this.form.valid;
  }

  login(){
    if(this.isValidForm()){
      const {email} = this.createdPayloadLogin();
      this.loginServiceApi.login(this.createdPayloadLogin())
      .subscribe((res: any)=>{
        const {token} = res;
        this.localStorageService.setLocalStorage('token', JSON.stringify(token));
        this.localStorageService.setLocalStorage('usuario', JSON.stringify(email));
        this.navigateURL('folder');
      }
      )
    }
  }

  async showLoading() {

    const loading = await this.loadingCtrl.create({
      message: 'Estamos iniciando...',
      duration: 3000,
      cssClass: 'custom-loading',
    });
    this.login();
    loading.present();

  }
  navigateURL(url: string){
    this.router.navigate([`/${url}`])
  }


}
