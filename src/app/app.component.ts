import { DatabaseService } from './services/database.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Buscar Informações',
      url: '/buscarinfo',
      icon: 'car'
    },
    {
      title: 'Veículos Cadastrados',
      url: '/veiculoscadastrados',
      icon: 'list-box'
    },
    {
      title: 'Sobre o App',
      url: '/sobreoapp',
      icon: 'information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbService: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      
      this.dbService.createDataBase();
      
      this.splashScreen.hide();
    });
  }
}
