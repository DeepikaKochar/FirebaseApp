import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { PresentService } from './services/present-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public userEmail: string = '';
  public isLoggedIn: boolean = false;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    private presentService: PresentService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    await this.presentService.presentLoader();
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      this.presentService.dismissLoader();
      if (res !== null) {
        this.isLoggedIn = true;
        this.userEmail = res.email;
        this.router.navigate(['dashboard']);
      } else {
        this.isLoggedIn = false;
        console.log('else');
      }
    }, err => {
      this.isLoggedIn = false;
      this.presentService.dismissLoader();
      console.log('err', err);
    })
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout() {
    this.presentService.presentConfirmAlert('Action confirmation!', 'Are you sure you want to logout?', (res) => {
      this.presentService.presentLoader();
      this.authService.logoutUser().then(res => {
        this.isLoggedIn = false;
        this.presentService.dismissLoader();
        this.navCtrl.navigateBack('');
      }).catch(error => {
        this.presentService.dismissLoader();
        console.log(error);
      })
    })
  }

}
