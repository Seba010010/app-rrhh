import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  //validar: boolean = false;



  constructor(private router: Router, private alertController: AlertController, /*  private sqlite: SQLite */) { 

/*     this.sqlite.create({
      name: "datos.db",
      location: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(CORREO VARCHAR(50), CONTRASENA VARCHAR(50), ESTADO VARCHAR(50))', []).then(() => {
          console.log('BBDD OK');
        })
    });

 */  }


/*  guardarUsuario(correo,contrasena,estado) {
  this.sqlite.create({
    name: "datos.db",
    location: "default"
  }).then((db: SQLiteObject) => {
    db.executeSql('INSERT INTO USUARIO VALUES(?,?,?)', 
    [correo,contrasena,estado]).then(() => {
      console.log('GUARDADO OK');
      })
  });
}
 */
/* borrarUsaurio() {
  this.sqlite.create({
    name: "datos.db",
    iosDatabaseLocation: "default"
  }).then((db: SQLiteObject) => {
    db.executeSql('DELETE FROM USUARIO', 
    []).then(() => {
        console.log('ELIMINADO OK');
      })
  });
}
 */

/* ObtenerSesion() {
  return this.sqlite.create({
    name: "datos.db",
    location: "default"
  }).then((db: SQLiteObject) => {
    return db.executeSql('SELECT ESTADO ' 
      + ' FROM USUARIO ', []).then((data) => {
        console.log('OK',{data})
        return data;
      })
  });
}

 */

/* Valida(){
  this.validador = true;
  return true;
}
 */


  


  async mostrarMensaje(){
    const alert = await this.alertController.create({
      header: 'Cuidao',
      subHeader:'Credenciales invalidas',
      buttons: ['OK'],
    });

    await alert.present();
  }







}
