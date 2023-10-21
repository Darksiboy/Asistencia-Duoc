import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AsistenciaStorageService } from 'src/app/services/asistencia-storage.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  KEY : string = "asignaturas"
  asignaturas: any[] = [];

  constructor(private asignaturaService : AsignaturaService,
              private asistenciaStorage : AsistenciaStorageService) { }

  async ngOnInit() {
    await this.listar();
  }


  async listar(){
    this.asignaturas = await this.asignaturaService.listar(this.KEY);
  }
}
