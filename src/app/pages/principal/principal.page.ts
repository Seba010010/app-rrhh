import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
//import { SQLiteOriginal } from '@ionic-native/sqlite';




@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  datos : any;
  id: string;
  lista_personas = [];
  data: any;
  nombreUsuario: string;
  apellidoUsuario: string;
  contrasenaUsuario: string;
  getData:any[]=[];
  handlerMessage = '';
  roleMessage = '';
  mdl_correo = '';


  constructor(private router: Router,  private api: ApiService, private activatedRoute: ActivatedRoute, private loadingCtrl: LoadingController, private alertController: AlertController, private db: DbService, private sqlite: SQLite) { 

    this.api.getData<any[]>("").subscribe(data => {
      this.getData = data
      console.log(this.getData);
    })
  }


  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.correo;
        this.obtenerNombre(this.data);

        //Retorna el correo del usuario this.data
        console.log(`Usuario desde vista principal ${this.data}`)
      }
    });

  }

  async obtenerNombre(correo){
    let that = this;

    let resultado = await that.api.listarPersonas(correo);

    let nombre = resultado['result'][0]['NOMBRE'];
    let apellido = resultado['result'][0]['APELLIDO'];
 



    this.nombreUsuario = nombre;
    this.apellidoUsuario = apellido;


    
  }


  cambiarContrasena(){
    this.router.navigate(['cambiocontrasena']);
  }

  irRegistrar(){
    this.router.navigate(['registrar-asistencia'], this.data)
    console.log(this.data);
}



  


/*   salir() {
    this.db.eliminarUsaurio();
    localStorage.clear();
    this.listar();
    this.router.navigate(['login']);
  }
 */

   salir() {
    this.router.navigate(['login']);
  }



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
  



}

