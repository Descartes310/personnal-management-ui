import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/_models/profile.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotifService } from 'src/app/_services/notif.service';
import { ProfileService } from 'src/app/_services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-profile',
  templateUrl: './all-profile.component.html',
  styleUrls: ['./all-profile.component.scss']
})
export class AllProfileComponent implements OnInit {
  profiles: Profile[] = [];
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
  cancelledMessage = ''

  constructor(
    private profileService: ProfileService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'profile' })
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
    this.getProfiles();
  }

  getProfiles() {
    this.loading = true;
    this.profileService.all().then(
      response => {
        this.profiles = [];
        //console.log(response);
        response.map(profile => {
          this.profiles.push(new Profile(profile));
        });
        console.log(this.profiles);
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

  editProfile(profile: Profile) {
    this.router.navigate(['/profiles/update/' + profile.id])
  }

  detailsProfile(profile: Profile) {
    this.router.navigate(['/profiles/details/' + profile.id])
  }
  
  formatter(value) {
    return (value === 1) ? 'Oui' : ((value === 0) ? 'Non' : '');
  }

  deleteProfile(profile: Profile) {
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
        this.profileService.delete(profile.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getProfiles();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Profile.' + error.error.code)
              .subscribe(val => this.notifService.danger(val));
          }
        )

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
