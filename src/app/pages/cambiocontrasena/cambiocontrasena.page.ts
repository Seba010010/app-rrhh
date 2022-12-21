import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
//import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
//import { SQLiteOriginal } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite/ngx';



@Component({
  selector: 'app-cambiocontrasena',
  templateUrl: './cambiocontrasena.page.html',
  styleUrls: ['./cambiocontrasena.page.scss'],
})
export class CambiocontrasenaPage implements OnInit {

  mdl_contrasena: string = '';
  mdl_contrasena2: string = '';
  mdl_contrasena3: string = '';
  mdl_correo: string = '';
  correoUsuario: string = '';
  contrasenaUsuario: string = '';
  mdl_contrasenaold: string= '';
  mdl_contrasenanew: string= '';


  data: any;



  constructor(private router: Router, private db: DbService, private api: ApiService, private loadingCtrl: LoadingController, private toastController: ToastController, private activatedRoute: ActivatedRoute, private sqlite: SQLite) { }

  ngOnInit() {

  }

   actualiza(){  
    let that = this;
    this.loadingCtrl.create({
      message: 'Actualizando contrasena',
      spinner: 'bubbles'
    }).then(async res => {
      res.present();

      let data = await that.api.contrasenaModificar(this.mdl_correo, this.mdl_contrasenanew, this.mdl_contrasenaold);
      console.log(data)
      console.log(data['result'])

      if(data['result'][0].RESPUESTA == 'OK') {
        that.mostrarMensaje('Actualizado correctamente');
        that.limpiar();
        this.router.navigate(['login']);
      } else if(data['result'][0].RESPUESTA == 'ERR02') {
        that.mostrarMensaje('Error, intente de nuevo');
      } else{
        that.mostrarMensaje('Error, ingrese datos correctos');
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

   limpiar() {
    this.mdl_correo = '';
    this.mdl_contrasenaold = '';
    this.mdl_contrasenanew = '';
    this.mdl_contrasena3 = '';
  }


//TRAER DATOS

async obtenerContrasena(correo, contrasena2, contrasena){
  let that = this;

  let resultado = await that.api.contrasenaModificar(correo, contrasena2, contrasena);

  let correo1 = resultado['result'][0]['CORREO'];

  this.correoUsuario = correo1;
  
}




}
