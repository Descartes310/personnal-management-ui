import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../_services/lang.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  lan;
  profile;
  user;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private langService: LangService,
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user)
    this.lan = this.translateService.currentLang;
    // this.userService.find(this.user.id).then(
    //   response => {
    //     this.profile = response;
    //     console.log(response)
    //   }
    // );
  }

  logout() {
    this.authService.logout();
  }

  changeLanguage(value) {
    this.langService.setLang(value);
    this.lan = value;
  }

  goToChat() {
    this.router.navigate(['/chat']);
  }

}
