import { Component, OnInit } from '@angular/core';
import { License } from 'src/app/_models/license.model';
import { LicenseService } from 'src/app/_services/license.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-demandes-license',
  templateUrl: './all-demandes-license.component.html',
  styleUrls: ['./all-demandes-license.component.scss']
})
export class AllDemandesLicenseComponent implements OnInit {

  licenses: License[] = [];
  loading: Boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  licenseForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  is_active=false;

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
    private licenseService: LicenseService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
        { data: 'vacation' })
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
    this.getLicenses();
  }

  getLicenses() {
    this.loading = true;
    this.licenseService.all().then(
      response => {
        this.licenses = [];
        response.map( license => {
          (license.status == "PENDING") ? this.licenses.push(new License(license)): null;
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

  detailsRequest(license: License) {
    this.router.navigate(['/license/demandes/'+license.id]);
  }


}
