import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  auth2: any;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadGoogleSignin();
  }

  loadGoogleSignin(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '946880795736-5ojeo39e17n91ggfena8unt59bfnc0l7.apps.googleusercontent.com'
      }).then(() => {
        this.auth2 = gapi.auth2.getAuthInstance();
        this.attachSignin(document.getElementById('google-signin'));
      }).catch((err) => console.error(err));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => element.innerText = `Signed in as ${googleUser.getBasicProfile().getName()}`,
      (error) => console.error(error)
    );
  }


  // displayLoginInfo() {
  //   this.auth2 = gapi.auth2.getAuthInstance();
  //   if (this.auth2.isSignedIn.get()) {
  //     var profile = this.auth2.currentUser.get().getBasicProfile();
  //     console.log('ID: ' + profile.getId());
  //     console.log('Full Name: ' + profile.getName());
  //     console.log('Given Name: ' + profile.getGivenName());
  //     console.log('Family Name: ' + profile.getFamilyName());
  //     console.log('Image URL: ' + profile.getImageUrl());
  //     console.log('Email: ' + profile.getEmail());
  //   }
  // }

  login(buttonType: string) {
    if (buttonType == 'login') {
      let user = { 'email': this.loginForm.value.email, 'password': this.loginForm.value.password };
      this.http.post('http://localhost:9000/api/user/login', user).subscribe((data) => console.log(data));
    } else if (buttonType == 'google-signin') {
      if (this.auth2.isSignedIn.get()) {
        let token = { token: this.auth2.currentUser.get().getAuthResponse().id_token };
        this.http.post('http://localhost:9000/api/user/google-login', token).subscribe((data) => console.log(data));
      }
    }
  }

}

interface User {
  userName: string,
  password: string
}
