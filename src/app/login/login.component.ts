import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifService } from '../_services/notif.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  unknowError = false;
  isLoading = false;
  notLogged = false;
  isLoginError = false;
  isLoginSuccess = false;
  keepMeLoggedIn = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notifService: NotifService,
    private translate: TranslateService) {
  }

  ngOnInit() {

    if (this.authService.isAuthenticated() ) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

    // Validateur du formulaire
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params.returnUrl) {
        this.notLogged = true;
      }
    });

  }

  get form() {
    return this.loginForm.controls;
  }

  onCheckboxClick(event: any) {
    this.keepMeLoggedIn = event.target.checked;
  }

  /**
   * @ngdoc function
   * @description Cette fonction fait verifie si les params de connexion sont
   * bien remplis et fait appel a la methode login de AuthService
   * @author Descartes Fowo
   */
  onSubmit() {
    this.isSubmitted = true;
    this.unknowError = false;
    this.isLoginError = false;
    this.isLoginSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.loginForm.invalid) {
      this.translate.get('Login.AUTH_LOGIN_FORM')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    this.authService.login(this.form.login.value, this.form.password.value, this.keepMeLoggedIn)
      .then(resp => {
        this.authService.savePermissions(resp.permissions);
        this.authService.saveRoles(resp.roles);
        this.authService.saveToken(resp.token);
        this.authService.saveUser(resp.user);
        this.notifService.success('La connexion a reussie')
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.translate.get('Login.AUTH_LOGIN')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
