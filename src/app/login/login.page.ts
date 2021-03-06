import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { PresentService } from '../services/present-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder, private presentService: PresentService) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  async loginUser(value) {
    await this.presentService.presentLoader();
    this.authService.loginUser(value)
      .then(res => {
        this.presentService.dismissLoader();
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/dashboard');
      }, err => {
        this.presentService.dismissLoader();
        this.errorMessage = err.message;
      })
  }

  async tryRegister(value) {
    this.presentService.presentLoader();
    this.authService.registerUser(value)
      .then(res => {
        this.presentService.dismissLoader();
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
      }, err => {
        this.presentService.dismissLoader();
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

}