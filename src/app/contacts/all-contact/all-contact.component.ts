import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Contact } from 'src/app/_models/contact.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-contact',
  templateUrl: './all-contact.component.html',
  styleUrls: ['./all-contact.component.scss']
})
export class AllContactComponent implements OnInit {

  contacts:Contact[]=[];
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
    private contactService:ContactService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'contact' })
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
    this.getContacts();
  }
 
  getContacts() {
    this.loading = true;
    this.contactService.all().then(
      response => {
        console.log(response)
        this.contacts = [];
        //this.pro_situations=response
        response.map(contact => {
          this.contacts.push(new Contact(contact));
        });
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

  editContact(contact:Contact) {
    this.router.navigate(['/contacts/update/' + contact.id])
  }

  detailsContact(contact:Contact) {
    this.router.navigate(['/contacts/details/' + contact.id])
  }

  deleteContact(contact:Contact) {
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
        this.contactService.delete(contact.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getContacts();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Contact.' + error.error.code)
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
