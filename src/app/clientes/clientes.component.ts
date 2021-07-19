import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { confirmAction, deleted } from 'src/assets/alerts/alerts';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private clienteService: ClienteService) { 
    
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes)
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
 