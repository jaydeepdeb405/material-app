import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { GooglesigninService } from './googlesignin.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    NavLinksComponent,
    ContentViewComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [DataService, GooglesigninService],
  bootstrap: [AppComponent]
})
export class AppModule { }
