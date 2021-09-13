import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { confirmAction, deleted } from 'src/assets/alerts/alerts';
import {tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];
  paginador: any;

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if(!page){
        page=0
      }

      this.clienteService.getClientes(page).pipe(
        tap( response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;

          console.log('tap 3')
          // (response.content as Cliente[]).forEach(cliente => {
          //   console.log(cliente.nombre)
          // }
          // )
        })
      ).subscribe()
      // ).subscribe(clientes => this.clientes = clientes)
    })
  }

  delete(cliente: Cliente): void{
    swal.fire(confirmAction('Seguro que desea eliminar?'))
    .then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
          }
        )

        swal.fire(deleted(`Has eliminado a ${cliente.nombre}`))
      }
    })
  }
}
