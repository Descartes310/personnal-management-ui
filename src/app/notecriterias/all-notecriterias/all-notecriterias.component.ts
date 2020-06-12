import { Component, OnInit } from '@angular/core';
import { Notecriterias } from 'src/app/_models/notecriterias.model';
import { NotecriteriasService } from 'src/app/_services/notecriterias.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-all-notecriterias',
  templateUrl: './all-notecriterias.component.html',
  styleUrls: ['./all-notecriterias.component.scss']
})
export class AllNotecriteriasComponent implements OnInit {


  notecriterias: Notecriterias[] = [];
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
  canCreate = false;
  canUpdate = false;
  canDelete = false;


  constructor(
    private authService: AuthService,
    private notecriteriasService: NotecriteriasService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSureNotecriterias', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: ' ce critère de notation' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSureNotecriterias'];
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
    this.getNotecriterias();
    const permissionSuffix = 'note-criterias';
    this.canCreate = this.authService.hasPermission(`create-${permissionSuffix}`);
    this.canUpdate = this.authService.hasPermission(`update-${permissionSuffix}`);
    this.canDelete = this.authService.hasPermission(`delete-${permissionSuffix}`);
  }

  getNotecriterias() {
    this.loading = true;
    this.notecriteriasService.all().then(
      response => {
        this.notecriterias = [];
        response.map( notecriterias => {
          this.notecriterias.push(new Notecriterias(notecriterias));
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
  editNotecriterias(notecriterias: Notecriterias) {
    this.router.navigate(['/note-criterias/update/'+notecriterias.id])
  }

  detailsNotecriterias(notecriterias: Notecriterias) {
    this.router.navigate(['/notecriterias/details/'+notecriterias.id])
  }

  deleteNotecriterias(notecriterias: Notecriterias) {
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
        this.notecriteriasService.delete(notecriterias.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getNotecriterias();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Notecriterias.'+error.error.code)
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
