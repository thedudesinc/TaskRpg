import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PagesComponent } from './pages/pages.component';
import { SignupComponent } from './layout/signup/signup.component';
import { LoginComponent } from './layout/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingComponent } from './layout/landing/landing.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { GlobalInterceptor } from './shared/interceptors/global.interceptor';
import { LoadingComponent } from './layout/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    PagesComponent,
    LandingComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
