import { Injectable } from '@angular/core';

declare let gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginProviderService {

  private googleAuth: any;
  private googleUser: any;
  private isSignedIn: boolean;
  private clientId: string = '946880795736-5ojeo39e17n91ggfena8unt59bfnc0l7.apps.googleusercontent.com';

  constructor() {
    this.loadGooglePlatformLibrary();
  }

  private loadGooglePlatformLibrary() {
    let platform = document.createElement('script');
    platform.async = true;
    platform.src = 'https://apis.google.com/js/platform.js';
    platform.onload = () => this.loadGapi();
    document.head.append(platform);
  }

  private loadGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        this.googleAuth = gapi.auth2.init({
          client_id: this.clientId
        });
        
        this.googleAuth.then(() => {
          resolve();
        }).catch((err: any) => reject(err));
      });
    });
  }

  signIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.googleAuth.signIn().then((googleUser) => {
        this.googleUser = googleUser;
        this.isSignedIn = true;
        resolve();
      }).catch((error: any) => reject(error))
    })
  }

  getToken() {
    return this.googleUser.getAuthResponse().id_token;
  }

  getProfile() {
    let profile = {};
    if(this.isSignedIn) {
      profile['firstName'] = this.googleUser.getBasicProfile().getGivenName();
      profile['lastName'] = this.googleUser.getBasicProfile().getFamilyName();
      profile['email'] = this.googleUser.getBasicProfile().getEmail();
    }
    return profile;
  }

}
