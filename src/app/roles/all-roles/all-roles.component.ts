import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/_models/role.model';
import { RoleService } from 'src/app/_services/role.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.scss']
})
export class AllRolesComponent implements OnInit {

  roles: Role[] = [];
  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = ''
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';


  constructor(
    private roleService: RoleService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
<<<<<<< HEAD
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
=======
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
        { data: 'role' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSure'];
          this.warning = val['SweetAlert.Warning'];
          this.yes = val['SweetAlert.Yes'];
          this.no = val['SweetAlert.No'];
          this.deleted = val['SweetAlert.Deleted'];
          this.deletedMessage = val['SweetAlert.DeletedMessage'];
          this.cancelled = val['SweetAlert.Cancelled'];
          this.cancelledMessage = val['SweetAlert.CancelledMessage'];
        });
   }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.loading = true;
    this.roleService.all().then(
      response => {
<<<<<<< HEAD
        this.roles = [];
        response.data.map( role => {
          this.roles.push(new Role(role));
=======
        console.log(response);
        this.roles = [];
        response.data.map( role => {
          this.roles.push(new Role(role));
          console.log('ok\n\nok' + response.data + 'rte\n\n');
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  editRole(role: Role) {
    this.router.navigate(['/roles/update/'+role.id])
  }

  detailsRole(role: Role) {
    this.router.navigate(['/roles/details/'+role.id])
  }

  deleteRole(role: Role) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.roleService.delete(role.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getRoles();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Role.'+error.error.code)
            .subscribe(val => this.notifService.danger(val));
          }
        )
<<<<<<< HEAD
        
=======

>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        )
      }
    })
  }
}
