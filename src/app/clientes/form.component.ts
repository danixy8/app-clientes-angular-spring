import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear cliente';

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  
  }

  create(): void{
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']),
        swal.fire({
          // icon: 'success',
          imageUrl: '/assets/gifs/cat-ok.gif',
          title: 'Buen Trabajo!',
          text: "Nuevo Cliente Agregado exitosamente",
          showConfirmButton: false,
          timer: 5000,
          width: 600,
          padding: '3em',
          background: '#fff',
          backdrop: `
            rgba(0,0,123,0.4)
            url('/assets/gifs/nyan-cat.gif')
            left top
            no-repeat
          `
        })
      })
  }

}
