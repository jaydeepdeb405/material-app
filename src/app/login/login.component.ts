import { Component, OnInit } from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth2: any;

  constructor() { }

  ngOnInit() {
    this.loadAuth2().then(() => {this.displayLoginInfo()});
  }

  loadAuth2() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', function() {
        gapi.auth2.init({
          client_id: '946880795736-5ojeo39e17n91ggfena8unt59bfnc0l7.apps.googleusercontent.com'
        }).then(()=>resolve('success'))
      });   
    });
  }

  displayLoginInfo() {
    let auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      var profile = auth2.currentUser.get().getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }
  }

}
