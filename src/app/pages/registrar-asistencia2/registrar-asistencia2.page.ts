import { Component, OnInit } from '@angular/core';
import{Camera, CameraResultType} from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService, correoLogueado, validado } from 'src/app/services/api.service';
import { ActivatedRoute, Router, NavigationExtras  } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { SQLite } from '@ionic-native/sqlite/ngx';



@Component({
  selector: 'app-registrar-asistencia2',
  templateUrl: './registrar-asistencia2.page.html',
  styleUrls: ['./registrar-asistencia2.page.scss'],
})
export class RegistrarAsistencia2Page implements OnInit {

  texto: string = '';
  mdl_correo: string = "";
  handlerMessage = '';
  roleMessage = '';
  id_clase: string = '';
  asistencia: string = '';
  correo: string = '';




  constructor(private api: ApiService,  private alertController: AlertController, private router: Router, private toastController: ToastController, private sqlite: SQLite,  private db: DbService,) { 
/*     try{
      let that = this;
        that.db.getCorreo().then((value) => {
          const str: string = value;
          console.log('PYD: '+str)
          if(str == ''){
            console.log('Sin datos registrados')
          }else if(str != '')
            console.log('Con datos registrados.');
            that.mdl_correo = str;
            console.log('PYD: '+str);
          
        })
    }catch{
      console.log('Sin datos registrados')
    }
 */

    this.correo = localStorage.getItem("correo");


  }

  ngOnInit() {
  }

  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  async leerQR() {
    //this.router.navigate(['registrar-asistencia2']);

/*     document.querySelector('body').classList.add('scanner-active');

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); 

    if (result.hasContent) {
      this.texto = (result.content)

       var arreglo = this.texto.split('|');
      this.id_clase = arreglo[0];
      this.registrarAsistencia();
      
    
      let that = this;
      let data = await that.api.asistenciaAlmacenar(this.correo, this.texto);


      const asistenciaAlmacenar:any = await that.api.asistenciaAlmacenar(this.correo, this.texto)
      if(asistenciaAlmacenar["result"][0].RESPUESTA=='OK'){
        //mandar mensaje
        this.asistenciaRegistrada();
        console.log("asistencia registrada")
        this.router.navigate(['principal'])
      } else if(data['result'][0].RESPUESTA == 'ERR03') {
        console.log('Error')
        that.mostrarMensaje('ERROR, INTENTE DE NUEVO')
        that.mostrarMensaje(this.correo);
        this.router.navigate(['principal']);
      } else {
        console.log("NADA")
        that.mostrarMensaje('NADA')
        this.router.navigate(['principal'])
      }

    }

    document.querySelector('body').classList.remove('scanner-active');
 */  };

  async asistenciaRegistrada() {
    const alert = await this.alertController.create({
      header: 'Info',
      //subHeader: 'Important message',
      message: 'Asistencia registrada con éxito!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async asistenciaError() {
    const alert = await this.alertController.create({
      header: 'Info',
      //subHeader: 'Important message',
      message: 'Usted ya registró asistencia!',
      buttons: ['OK']
    });

    await alert.present();
  }







/*     async leerQR() {
    document.querySelector('body').classList.add('scanner-active');

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();
  
    const result = await BarcodeScanner.startScan(); 
  
    if (result.hasContent) {
      this.texto = (result.content);
      var arreglo = this.texto.split('|');
      this.id_clase = arreglo[0];
      this.registrarAsistencia();

    }

    document.querySelector('body').classList.remove('scanner-active');
    };



    async registrarAsistencia() {

    let that = this;
    let data = await that.api.asistenciaAlmacenar(this.mdl_correo, this.texto);

    if(data['result'][0].RESPUESTA == 'OK') {
      this.db.almacenarAsistencia(this.mdl_correo, this.texto);
      console.log('OK')
      that.mostrarMensaje('OK');
    } else if(data['result'][0].RESPUESTA == 'ERR03') {
      console.log('Error')
      that.mostrarMensaje('ERROR');
    } else {
      console.log("NADA")
      that.mostrarMensaje('NADA')
    }
  };
 */
}
