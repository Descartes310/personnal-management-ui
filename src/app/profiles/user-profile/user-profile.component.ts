import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user;
  roles;
  permissions;
  permissions_tmp;
  profile;

  constructor(
    private authService:AuthService,
    private notifService:NotifService,
    private userService:UserService,
    private translate : TranslateService
  ) { }

  async ngOnInit() {
    this.user = this.authService.getUser();
    this.roles = this.authService.getRoles();
    this.permissions = this.authService.getPermissions();
    this.permissions_tmp = this.authService.getPermissions();
    console.log(this.roles);
    console.log(this.user);
    console.log(this.permissions);
    this.userService.find(this.user.id).then(
      response => {
        this.profile = response;
        console.log(this.profile); 
      }
    );
  }

  search(event) {
    this.permissions = this.permissions_tmp;
    this.permissions = this.permissions_tmp.filter( permission => permission.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}
