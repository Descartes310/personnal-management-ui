import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AddTokenInterceptor } from './_http-interceptors/add-token.interceptor'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './_guards/auth.guard'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavigationDrawerComponent } from './navigation-drawer/navigation-drawer.component';
import { ThemeSettingComponent } from './theme-setting/theme-setting.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NotfoundComponent,
    SideBarComponent,
    NavigationDrawerComponent,
    ThemeSettingComponent,
    DocumentViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
