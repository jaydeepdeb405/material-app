import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleLoginProviderService } from '../google-login-provider.service';

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

  constructor(private http: HttpClient, private googleLoginProvider: GoogleLoginProviderService) { }

  ngOnInit() {    
    
  }

  login(buttonType: string) {
    if (buttonType == 'login') {
      let user = { 'email': this.loginForm.value.email, 'password': this.loginForm.value.password };
      this.http.post('http://localhost:9000/api/user/login', user).subscribe((data) => console.log(data));
    } else if (buttonType == 'google-signin') {
      this.googleLoginProvider.signIn().then(() => {
        this.http.post('http://localhost:9000/api/user/google-login', {token: this.googleLoginProvider.getToken()})
        .subscribe((data) => console.log(data));
      });
      
      // if (this.auth2.isSignedIn.get()) {
      //   let token = { token: this.auth2.currentUser.get().getAuthResponse().id_token };
      //   this.http.post('http://localhost:9000/api/user/google-login', token).subscribe((data) => console.log(data));
      // }
    }
  }

}

interface User {
  userName: string,
  password: string
}
