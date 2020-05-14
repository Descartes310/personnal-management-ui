import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './_services/auth.service';
import { LangService } from './_services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PMUI';
  lang = 'fr'
  isAuthenticated = false;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private langService: LangService
  ) { 
      translate.setDefaultLang(this.lang);
      translate.use(this.lang);
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.getEmittedValue().subscribe(value => this.isAuthenticated = value);
    this.langService.getEmittedValue().subscribe(value => {
      this.lang = value;
      this.translate.setDefaultLang(value);
      this.translate.use(value);
      console.log('la langue courante est: ', this.lang)
    });
  }
}
