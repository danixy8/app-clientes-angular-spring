import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { error, success } from 'src/assets/alerts/alerts';
import {environment} from '../../../environments/environment.dev';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  placeholderFoto: string = "Seleccionar foto";
  imagesUrlEndPoint: string = `${environment.apiHost}/api/uploads/img/`;
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private clienteService: ClienteService,
    public modalService: ModalService
    // private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe(params => {
    //   let id: number = + params.get('id');
    //   if(id){
    //     this.clienteService.getCliente(id).subscribe(cliente => {
    //       this.cliente = cliente;
    //       console.log(this.cliente);
    //     });
    //   }
    // });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    this.placeholderFoto = `${event.target.files[0].name.slice(0, 35)}...`;
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire(error(`El archivo debe de ser una imagen`));
      this.fotoSeleccionada = null;
      this.placeholderFoto = "Seleccionar foto";
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal.fire(error(`Debe de seleccionar una foto`));
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.cliente=response.cliente as Cliente;
          swal.fire(success(`La foto se a subido exitosamente! Foto:${this.cliente.foto.slice(0, 10)}...`));
        }

      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
