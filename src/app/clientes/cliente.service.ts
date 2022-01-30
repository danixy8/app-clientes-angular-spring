import { Injectable } from '@angular/core';
import {formatDate, DatePipe} from '@angular/common';
import { Cliente } from './cliente';
// import { CLIENTES } from './clientes.json';
import {environment} from '../../environments/environment.dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { error } from 'src/assets/alerts/alerts';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlHost = environment.apiHost;
  private urlEndPoint = `${this.urlHost}/api/clientes`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable <any> {
    // return of(CLIENTES)
    // return this.http.get<Cliente[]>(this.urlEndPoint)
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      // el orden de los taps importan. en este punto habria que convertir el objeto a un Cliente[] para usar un metodo de arrays
      tap((response: any) => {
        console.log('tap 1');
        // let clientes = response as Cliente[];
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre)
        })
      }),
      map( (response: any) => {
        // return clientes
        // para devolver el cliente modificado desde el servicio usar este codigo
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
        //   let datePipe = new DatePipe('es-CL')
        //   cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')
        //   // cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');
          return cliente;
        });
        return response;
      }),
      //en este punto el tapa recoge el return del map que seria un Cliente[]
      // tap(response => {
      //   console.log('tap 2')
      //   (response.content as Cliente[]).forEach(cliente => {
      //     console.log(cliente.nombre)
      //   }
      //   )
      // }),
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

  subirFoto(archivo: File, id: number): Observable<Cliente>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id.toString());
    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire(error(`${e.error.mensaje}`));
        return throwError(e);
      })
    );

  }
}
