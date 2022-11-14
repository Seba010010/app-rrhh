import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService, correoLogueado, validado } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = "";
  mdl_contrasena: string = "";
  nombre1: string;



  constructor(private router: Router, private alertController: AlertController, private db: DbService, private api: ApiService, private loadingCtrl: LoadingController, private toastController: ToastController /* private sqlite: SQLite */) { 
  }

  ngOnInit() {

    this.loadingCtrl.create({
      message: 'Obteniendo información',
      spinner: 'bubbles'
    }).then(res => {
      res.dismiss();
    });

    try {
      let estado = localStorage.getItem("estado");
      if(estado == 'activo'){
        this.mdl_correo = localStorage.getItem("correo");
        this.mdl_contrasena =localStorage.getItem("contrasena");
        console.log('PASAMOS');
        this.validarCredenciales();
      }  

  } catch (error) {
    console.log('NO PASAMOS');
    this.router.navigate(['login'], {replaceUrl: false});
  }

  }

  validarCredenciales(){
    let that = this;
    this.loadingCtrl.create({
      message: 'Iniciando',
      spinner: 'bubbles'
    }).then(async res => {
      res.present();
  

      let data = await that.api.loginUsuario(this.mdl_correo, this.mdl_contrasena);
      let data2 = await that.api.listarPersonas(this.mdl_correo);
      console.log(data2)
      console.log(data2['result'])
     

      let resultado = data2['result'];
      console.log(resultado)

      
      if(resultado.length <= 0){
        that.mostrarMensaje('Usuario no encontrado')
      }else{ 
        if(data['result'] == 'LOGIN OK') {
/*           that.db.Valida();
          localStorage.setItem("estado","activo");
          localStorage.setItem("correo",this.mdl_correo);
          localStorage.setItem("pass",this.mdl_contrasena);
          that.db.guardarUsuario(that.mdl_correo,that.mdl_contrasena,localStorage.getItem("estado"));   
 */  
          console.log("ok")
          that.mostrarMensaje('Ingreso correcto')
          correoLogueado(this.mdl_correo)
          validado(true)
          this.navegarPrincipal()

        } else if(data['result'] == 'LOGIN NOK') {
          console.log("nok")
          that.mostrarMensaje('Error al ingresar');
        } else {
          console.log('no paso a ninguna')
        }
      }
      debugger;
      res.dismiss();
    });

  }
  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  navegarPrincipal() {
    let datos: NavigationExtras = {
      state: {
        correo: this.mdl_correo
      }
    };
    this.router.navigate(['principal'], datos);
  }

  registroUsuario(){

    this.router.navigate(['registro'], );
  }




}
