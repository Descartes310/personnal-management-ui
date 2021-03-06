import { Component, OnInit } from '@angular/core';
import { DisciplinaryBoard } from 'src/app/_models/disciplinaryBoard.model';
import { DisciplinaryBoardService } from 'src/app/_services/disciplinaryBoard.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-all-disciplinary',
  templateUrl: './all-disciplinary.component.html',
  styleUrls: ['./all-disciplinary.component.scss']
})
export class AllDisciplinaryComponent implements OnInit {

  disciplinaryBoards: DisciplinaryBoard[] = [];
  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = '';
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';
  nom = 'le nom ici';
  canCreate = false;
  canUpdate = false;
  canDelete = false;


  constructor(
    private authService: AuthService,
    private disciplinaryBoardService: DisciplinaryBoardService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: 'disciplinaryBoard' })
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
    this.getDisciplinaryBoards();
    const permissionSuffix = 'disciplinary-boards';
    this.canCreate = this.authService.hasPermission(`create-${permissionSuffix}`);
    this.canUpdate = this.authService.hasPermission(`update-${permissionSuffix}`);
    this.canDelete = this.authService.hasPermission(`delete-${permissionSuffix}`);
  }

  getDisciplinaryBoards() {
    this.loading = true;
    this.disciplinaryBoardService.all().then(
      response => {
        this.disciplinaryBoards = [];
        //console.log(response)
        response.map( disciplinaryBoard => {
          this.disciplinaryBoards.push(new DisciplinaryBoard(disciplinaryBoard));
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        this.loading = false;
       }
      );
  }

  editDisciplinaryBoard(disciplinaryBoard: DisciplinaryBoard) {
    this.router.navigate(['/disciplinary_boards/update/' + disciplinaryBoard.id]);
  }

  detailsDisciplinaryBoard(disciplinaryBoard: DisciplinaryBoard) {
    this.router.navigate(['/disciplinaryBoards/details/' + disciplinaryBoard.id]);
  }

  deleteDisciplinaryBoard(disciplinaryBoard: DisciplinaryBoard) {
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
        this.disciplinaryBoardService.delete(disciplinaryBoard.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            );
            this.getDisciplinaryBoards();
          }
        ).catch(
          error => {
            console.log(error);
            this.blockUI.stop();
            this.translate.get('disciplinaryBoard.' + error.error.code)
              .subscribe(val => this.notifService.danger(val));
          }
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        );
      }
    });
  }

}
