
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/_services/role.service';
import { NotifService } from 'src/app/_services/notif.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/_models/role.model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2'
import { ProSituationService } from 'src/app/_services/pro_situation.service';
import { ProSituation } from 'src/app/_models/pro_situation.model';
@Component({
  selector: 'app-all-pro-situation',
  templateUrl: './all-pro-situation.component.html',
  styleUrls: ['./all-pro-situation.component.scss']
})
export class AllProSituationComponent implements OnInit {

  pro_situations: ProSituation[] = [];
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
    private prosituation_service:ProSituationService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSurePro', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
        { data: 'role' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSurePro'];
          this.warning = val['SweetAlert.Warning'];
          this.yes = val['SweetAlert.Yes'];
          this.no = val['SweetAlert.No'];
          this.deleted = val['SweetAlert.Deleted'];
          this.deletedMessage = val['SweetAlert.DeletedMessagePro'];
          this.cancelled = val['SweetAlert.Cancelled'];
          this.cancelledMessage = val['SweetAlert.CancelledMessage'];
        });
   }

  ngOnInit() {
    this.getProsituations();
  }

  getProsituations() {
    this.loading = true;
    this.prosituation_service.all().then(
      response => {
        console.log(response)
        this.pro_situations = [];
        this.pro_situations=response
      }
    ).catch(
      error => {
        console.log(error)
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  editProSituations(pro_situation:ProSituation) {
    this.router.navigate(['/pro-situations/update/'+pro_situation.id])
  }

  detailsProsituations(pro_situation: ProSituation) {
    this.router.navigate(['/pro-situations/details/'+pro_situation.id])
  }

  deleteProsituations(pro_situation:ProSituation) {
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
        this.prosituation_service.delete(pro_situation.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getProsituations();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Role.'+error.error.code)
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
