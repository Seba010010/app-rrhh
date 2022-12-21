import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

let correo: string = '';
let validador: boolean = false;

export let correoLogueado = (arg:string)=>{
  correo = arg
}

export let validado = (arg:boolean)=>{
  validador = arg
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  item : any;

//ruta 
  rutaBase: string = 'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php'; 

//3° paso
  constructor(private http: HttpClient, private router: Router) { }

  canActivate(){
    if(!validador){
      this.router.navigate(['login']);
      return false;
    } else  {
      return true;
    }
  }


//1° paso hacer funcion
  almacenarPersona(correo, contrasena, nombre, apellido){
    //promesa = peticion que espera una respuesta.
    let that = this;  

    //devolver nueva promesa. cuando termina el resultado se le dice "resolve". 
    //post es un insert en la base de datos. post es para insertar datos. más para realizar un cambio en bbdd. insertar, actulalizar y eliminar.

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: 'UsuarioAlmacenar', 
        parametros: [correo, contrasena, nombre, apellido]
      }).toPromise()) //se transforma el post a promesa. 
    })
  }

  loginUsuario(correo, contrasena){
    let that = this;  

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: 'UsuarioLogin', 
        parametros: [correo, contrasena]
      }).toPromise()) 
    })

  }


  async getUser(id: String) {

    let url = this.rutaBase + `?nombreFuncion=UsuarioObtenerNombre&correo=${id}`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) =>{
        resolve(data);
        console.log(data)
        this.item = data;
      },
      error =>
      {
        console.log("Error en comunicación");
      });
    });
  }


  contrasenaModificar(correo, contrasenaNew, contrasenaOld){
    let that = this;  

    return new Promise(resolve => {
      resolve(that.http.patch(that.rutaBase, {
        nombreFuncion: 'UsuarioModificarContrasena', 
        parametros: [correo, contrasenaNew, contrasenaOld]
      }).toPromise())
    })
  }


  listarPersonas(correo){
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.get(that.rutaBase + `?nombreFuncion=UsuarioObtenerNombre&correo=${correo}`).toPromise())
    })
  }

  getData<T> (url: string){
    url = 'https://api.gael.cloud/general/public/sismos'
    return this.http.get<T[]>(url);
  }


  asistenciaAlmacenar(correo, id_clase){
    let that = this;  

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: 'AsistenciaAlmacenar', 
        parametros: [correo, id_clase]
      }).toPromise()) 
    })
  }

  eliminarAsistencia() {
    let that = this;
    let url = `${that.rutaBase}?nombreFuncion=EliminarAsistencia&correo=${correo}`
    return new Promise(resolve => {
      resolve(that.http.get(url).toPromise())
    })
  }

  obtenerCorreo(){
    return correo;
  }

}
