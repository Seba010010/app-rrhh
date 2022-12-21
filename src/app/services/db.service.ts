import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
//import { SQLite } from '@ionic-native/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';




@Injectable({
  providedIn: 'root'
})
export class DbService {

  validar: boolean = false;
  logueado: boolean = false;




  constructor(private router: Router, private alertController: AlertController, private sqlite: SQLite) {  

/*     this.sqlite.create({
      name: "datos.db",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(CORREO VARCHAR(50), CONTRASENA VARCHAR(50), ESTADO VARCHAR(50))', [])
        .then(() => {
          console.log('BBDD OK');
        }).catch(e => {
          console.log('PYD: TABLA NO OK');
        })
      }).catch(e => {
        console.log('PYD: BASE DE DATOS NO OK')
    });

     this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS ASISTENCIA(CORREO VARCHAR(50), TEXTO VARCHAR(30))', [])
        .then(() => {
        console.log('TABLA ASISTENCIA CREADA OK');
      }).catch(e => {
        console.log('TABLA ASISTENCIA NO OK');
      })
    }).catch(e => {
      console.log('BASE DE DATOS NO OK')
    })
 */ };
  

  guardarUsuario(correo,contrasena,estado) {
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

  borrarUsuario() {
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


ObtenerSesion() {
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



/* Valida(){
  this.validador = true;
  return true;
}
 */

getCorreo() {
  return this.sqlite.create({
    name: 'datos.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    return db.executeSql('SELECT CORREO FROM USUARIO', []).then((data) => {

        return data.rows.item(0).MAIL; 
    })
  })
}

almacenarAsistencia(correo, texto) {
  this.sqlite.create({
    name: 'datos.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('INSERT INTO ASISTENCIA VALUES(?, ?)', [correo, texto]).then(() => {
      console.log('ASISTENCIA ALMACENADA OK');
    }).catch(e => {
      console.log('ASISTENCIA NO ALMACENADA');
    })
  }).catch(e => {
    console.log('BASE DE DATOS NO OK')
  })
}

getAsistencia(correo) {
  return this.sqlite.create({
    name: 'datos.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    return db.executeSql('SELECT CORREO, TEXTO FROM ASISTENCIA WHERE CORREO = (?)', [correo]).then((data) => {
      let arrayAsistencia = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          arrayAsistencia.push({
            correo: data.rows.item(i).CORREO,
            texto: data.rows.item(i).TEXTO
          });
        }
      }
      return(arrayAsistencia);
    }, (error) => {
      return(error)
    })

  })
}

borrarBaseAsistencia() {
  this.sqlite.create({
    name: 'datos.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('DROP TABLE ASISTENCIA', []).then(() => {
      this.crearBaseAsistencia();
      console.log('TABLA ASISTENCIA ELIMINADA');
    }).catch(e => {
      console.log('TABLA ASISTENCIA NO ELIMINADA');
    })
  }).catch(e => {
    console.log('BASE DE DATOS NO OK')
  })
}

crearBaseAsistencia(){

  this.sqlite.create({
    name: 'datos.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS ASISTENCIA(CORREO VARCHAR(35), TEXTO VARCHAR(30))', []).then(() => {
      console.log('TABLA CREADA OK');
    }).catch(e => {
      console.log('TABLA NO OK');
    })
  }).catch(e => {
    console.log('BASE DE DATOS NO OK')
  })
}


  async mostrarMensaje(){
    const alert = await this.alertController.create({
      header: 'Cuidao',
      subHeader:'Credenciales invalidas',
      buttons: ['OK'],
    });

    await alert.present();
  }



}
