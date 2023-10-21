import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo : string = "";
  clave_1 : string = "";

  admin: any = {
    rut: '21438692-5',
    nombre: 'Claudio',
    ap_paterno : 'Canales',
    ap_materno : 'Cerda',
    correo: 'cl.canales@duocuc.cl',
    fecha_nacimiento: '2003-11-04',
    tipo_usuario: 'administrador',
    clave_1: 'Claudio123',
    clave_2: 'claudio123'
  }

  docente: any = {
    rut: '20782958-7',
    nombre: 'benjamin',
    ap_paterno : 'canales',
    ap_materno : 'cerda',
    correo: 'be.canales@duocuc.cl',
    fecha_nacimiento: '2001-07-02',
    tipo_usuario: 'docente',
    clave_1: 'benjamin123',
    clave_2: 'benjamin123'
  }
  

  constructor(private usuarioStorage : UsuarioStorageService,
              private router : Router) { }


  fecha:Date = new Date();

  async ngOnInit() {
    await this.usuarioStorage.agregar(this.admin, 'usuarios');
    await this.usuarioStorage.agregar(this.docente, 'usuarios');
    alert(this.fecha.toLocaleDateString())
  }


  //Método para loguear:
  async ingresar(){
    var usuario_encontrado: any = await this.usuarioStorage.login(this.correo, this.clave_1, 'usuarios');
    if(usuario_encontrado != undefined){
      //ELEMENTO NUEVO PARA EL LOGIN:
      var navigationExtras: NavigationExtras = {
        state: {
          user: usuario_encontrado
        }
      };
      if(usuario_encontrado.tipo_usuario == "administrador"){
        this.router.navigate(['/home/crud-usuario'], navigationExtras);
      } else if(usuario_encontrado.tipo_usuario == "docente"){
        this.router.navigate(['/home/docente'], navigationExtras);
      } else if(usuario_encontrado.tipo_usuario == "alumno"){
        this.router.navigate(['/home/alumno'], navigationExtras);
      }

    }else{
      alert("USUARIO O CLAVE NO EXISTE!");
    }
  }

}
