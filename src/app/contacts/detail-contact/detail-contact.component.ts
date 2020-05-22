import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/_models/contact.model';
import { ContactService } from 'src/app/_services/contact.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.scss']
})
export class DetailContactComponent implements OnInit {

  contact:Contact = new Contact();
  constructor(
    private contactService: ContactService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const contact_id = +this.route.snapshot.paramMap.get("id");
    this.contactService.find(contact_id).then(
      data => {
        this.contact = new Contact(data);

      }
    ).catch(
      error => {
        this.translate.get('Contact.' + error.error.code)
          .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/contacts/all'])
      }
    )

  }

}
