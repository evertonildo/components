import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  FiltroOnOff() {
    const div = document.getElementById('div-filtro') as HTMLElement;
    console.log('div', div.hidden);
    if (!div.hidden) {
      console.log('entrou 1');
      div.setAttribute('hidden', "true");
    }
    else if (div['hidden']) {
      console.log('entrou 2');
      div.removeAttribute('hidden');
    }

  }

}
