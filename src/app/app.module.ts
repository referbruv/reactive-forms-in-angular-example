import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';

const routes: Routes = [
  { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },
  { path: "", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: ErrorInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
