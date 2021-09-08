import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { success } from 'src/assets/alerts/alerts';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear cliente';
  errores: string[];

  constructor(private clienteService: ClienteService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente )
      }
    })
  }

  create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']),
        swal.fire(success(`El cliente ${cliente.nombre} fue creado exitosamente`))
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error' + err.status);
        console.error(err.error.errors);
      }
      )
  }

  updated(): void{
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire(success(`El cliente ${cliente.nombre} fue actualizado exitosamente`))
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error' + err.status);
        console.error(err.error.errors);
      }
    )
  }

}
