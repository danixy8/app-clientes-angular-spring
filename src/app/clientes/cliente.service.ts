import { Injectable } from '@angular/core';
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
  private urlEndPoint = 'http://192.168.1.14:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable <Cliente[]> {
    // return of(CLIENTES)
    // return this.http.get<Cliente[]>(this.urlEndPoint)
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[] )
    )
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
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
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
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
  