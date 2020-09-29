import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public folder: string;
  public userEmail: string;
  public items = [
    {
      title: 'Item One'
    },
    {
      title: 'Item two'
    },
    {
      title: 'item three'
    },
    {
      title: 'Item four'
    },
    {
      title: 'Item five'
    },
    {
      title: 'Item six'
    }
  ];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private navCtrl: NavController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        console.log('else');
      }
    }, err => {
      console.log('err', err);
    })
  }

}
