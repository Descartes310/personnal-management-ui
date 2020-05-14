import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/_services/role.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/_models/role.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-role',
  templateUrl: './details-role.component.html',
  styleUrls: ['./details-role.component.scss']
})
export class DetailsRoleComponent implements OnInit {

  permissions: any[] = [];
  permissions_tmp: any[] = [];

  role: Role = new Role();


  constructor(
    private roleService: RoleService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const role_id = +this.route.snapshot.paramMap.get("id");
    this.roleService.find(role_id).then(
      data => {
        this.role = new Role(data);
        this.permissions = this.role.permissions;
        this.permissions_tmp = this.role.permissions;
      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/roles/all'])
      }
    )

  }

  search(event) {
    this.permissions = this.permissions_tmp;
    this.permissions = this.permissions_tmp.filter( permission => permission.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }
}
