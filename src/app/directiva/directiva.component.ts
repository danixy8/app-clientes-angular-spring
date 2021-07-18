import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styles: []
})
export class DirectivaComponent {

  listadoCurso: string[] = ['Typescript', 'Javascript', 'Java SE', 'C#', 'PHP'];

  habilitar: boolean = true;

  constructor() { }

}
