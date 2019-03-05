import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veiculoscadastrados',
  templateUrl: './veiculoscadastrados.page.html',
  styleUrls: ['./veiculoscadastrados.page.scss'],
})
export class VeiculoscadastradosPage implements OnInit {

  veiculos:String[];
  
  constructor() { }

  ngOnInit() {
  }

}
