import { Injectable } from '@angular/core';
import {formatDate, DatePipe} from '@angular/common';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { error } from 'src/assets/alerts/alerts';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://192.168.1.10:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable <Cliente[]> {
    // return of(CLIENTES)
    // return this.http.get<Cliente[]>(this.urlEndPoint)
    return this.http.get(this.urlEndPoint).pipe(
      map( response => {
        let clientes = response as Cliente[];

        return clientes
        // return clientes.map(cliente => {
        //   cliente.nombre = cliente.nombre.toUpperCase();
        //   let datePipe = new DatePipe('es-CL')
        //   cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')
        //   // cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');
        //   return cliente
        // });
      })
    )
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(error(`${e.error.mensaje}`));
        return throwError(e);
      }
      )
    );
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire(error(`${e.error.mensaje}`));
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError( e => {

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(error(`${e.error.mensaje}`));
        return throwError(e);
      }
      )
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire(error(`${e.error.mensaje}`));
        return throwError(e);
      }
      )
    );
  }
}
