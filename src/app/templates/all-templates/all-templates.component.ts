import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { TemplateService } from 'src/app/_services/template.service';
import { Template } from 'src/app/_models/template.model';


@Component({
  selector: 'app-all-templates',
  templateUrl: './all-templates.component.html',
  styleUrls: ['./all-templates.component.scss']
})
export class AllTemplatesComponent implements OnInit {

  templates: Template[] = [];
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
    private template_service:TemplateService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router
  ) { 
    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
      'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
      { data: 'modèle de document' })
      .subscribe(val => {
        this.areYouSure = val['SweetAlert.AreYouSure'];
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
    this.getTemplates();
  }

  getTemplates() {
    this.loading = true;
    this.template_service.all().then(
      response => {
        console.log(response)
        this.templates = [];
        this.templates=response
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

  editTemplates(template:Template) {
    this.router.navigate(['/templates/update/'+template.id])
  }

  detailsTemplates(template: Template) {
    this.router.navigate(['/templates/details/'+template.id])
  }

  deleteTemplates(template:Template) {
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
        this.template_service.delete(template.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getTemplates();
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
