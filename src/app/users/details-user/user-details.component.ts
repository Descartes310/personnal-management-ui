import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user;
  roles;
  permissions;
  permissions_tmp;
  profile;

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private route:ActivatedRoute
  ) { }

  async ngOnInit() {
    const user_id = +this.route.snapshot.paramMap.get("id");    
    this.userService.find(user_id).then(
      response => {
        console.log(response)
        this.user = response;
        this.roles = response.roles;
        this.permissions = response.permissions;
        this.permissions_tmp = response.permissions;
        this.profile = response;
      }
    );
  }

  search(event) {
    this.permissions = this.permissions_tmp;
    this.permissions = this.permissions_tmp.filter( permission => permission.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}
