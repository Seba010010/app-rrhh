import { Component, OnInit } from '@angular/core';
import{Camera, CameraResultType} from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
//import { ApiService, correoLogueado, validado } from 'src/app/services/api.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import {ApiService } from 'src/app/services/api.service';





@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {

  texto: string = '';
  mdl_correo: string = "";
  handlerMessage = '';
  roleMessage = '';
  data: any;
  getData:any[]=[];
  datos: any;
  correo: string = '';
  sub: any;
  id_clase: string = '';


  constructor(private api: ApiService,  private alertController: AlertController, private router: Router, private toastController: ToastController, private activatedRoute: ActivatedRoute, private db: DbService, private sqlite: SQLite, public navCtrl: NavController) { 
     try{
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
 
    this.correo = localStorage.getItem("correo");

  }

  ngOnInit() {  

/*     this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.correo;

        //Retorna el correo del usuario this.data
        console.log(`Usuario desde vista principal ${this.data}`)
      }
    });
 */
    this.activatedRoute.queryParams.subscribe(params => {
      this.data = params['this.data'];
      console.log(`Usuario desde vista principal ${this.data}`)

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

  async leerQR() {

    let that = this;
    
    this.router.navigate(['registrar-asistencia2']);
    
    document.querySelector('body').classList.add('scanner-active');
    
    await BarcodeScanner.checkPermission({ force: true });
    
    BarcodeScanner.hideBackground();
    
    //Obtendrá un resultado de la lectura del código
    const result = await BarcodeScanner.startScan(); 
    
    if (result.hasContent) {
      this.texto = (result.content)
      var arreglo = this.texto.split('|');
      this.id_clase = arreglo[0];
      this.correo = that.api.obtenerCorreo();

      this.registrarAsistencia(this.correo, this.id_clase);
  
    }

    document.querySelector('body').classList.remove('scanner-active');
   };

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



  // cancelarQR() {
  //   BarcodeScanner.showBackground();
  //   BarcodeScanner.stopScan();
  // }


  // async borrarAsistencia() {
  //   let that = this;
  //   await that.api.eliminarAsistencia();
  //   await that.db.borrarBaseAsistencia();
  //   that.mostrarMensaje('Asistencia ELIMINADA.');
  //   that.registro();
  // }

  // registro() {
  //   this.db.getAsistencia(this.correo).then((data: any) => {
  //     console.log('PYD: '+ data)
  //     this.ListAsistencia = data;
  //   }, (error) => {
  //     console.log('PYD: '+ error)
  //   })
  // }
 
 


  async registrarAsistencia(correo,id_clase) {

    let that = this;
    let data = await that.api.asistenciaAlmacenar(correo, id_clase);
   

    if(data["result"][0].RESPUESTA=='OK'){
      that.mostrarMensaje("ASISTENCIA REGISTRADA")
      this.navCtrl.pop();
      //this.router.navigate(['principal'])
    } else if(data['result'][0].RESPUESTA == 'ERR03') {
      console.log('Error')
      that.mostrarMensaje('ERROR, INTENTE DE NUEVO')
      this.navCtrl.pop();
      //this.router.navigate(['principal'])
    } else {
      console.log("NADA")
      that.mostrarMensaje('NADA')
      this.navCtrl.pop();
      //this.router.navigate(['principal'])
    }

  };

 
  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Estás seguro que quieres salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
          },
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['login']);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

};