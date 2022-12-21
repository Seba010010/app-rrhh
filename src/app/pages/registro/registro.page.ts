import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
//import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export default class RegistroPage implements OnInit {

  mdl_correo: string = "";
  mdl_contrasena: string = "";
  mdl_nombre: string = "";
  mdl_apellido: string = "";


  constructor(private router: Router, private alertController: AlertController, private db: DbService, private api: ApiService, private loadingCtrl: LoadingController, private toastController: ToastController, private sqlite: SQLite) { }

  ngOnInit() {

    this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles'
    }).then(res => {
      res.dismiss();
    });

  }

  almacenar(){
    let that = this;
    this.loadingCtrl.create({
      message: 'Registrando persona',
      spinner: 'bubbles'
    }).then(async res => {
      res.present();

      let data = await that.api.almacenarPersona(this.mdl_correo, this.mdl_contrasena, this.mdl_nombre, this.mdl_apellido);

      if(data['result'][0].RESPUESTA == 'OK') {
        that.mostrarMensaje('Registrado correctamente');
        that.limpiar();
      } else if(data['result'][0].RESPUESTA == 'ERR01') {
        that.mostrarMensaje('Error al registrar');
      } else {
        console.log("nada")
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
    this.mdl_contrasena = '';
    this.mdl_nombre = '';
    this.mdl_apellido = '';
  }


}
