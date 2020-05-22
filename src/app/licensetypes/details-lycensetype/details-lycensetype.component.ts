import { Component, OnInit } from '@angular/core';
import { License } from 'src/app/_models/license.model';
import { Licensetype } from 'src/app/_models/licensetype.model';
import { LicensetypeService } from 'src/app/_services/licensetype.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-lycensetype',
  templateUrl: './details-lycensetype.component.html',
  styleUrls: ['./details-lycensetype.component.scss']
})
export class DetailsLycensetypeComponent implements OnInit {

  licensetype: Licensetype = new Licensetype();


  constructor(
    private licensetypeService: LicensetypeService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const licensetype_id = +this.route.snapshot.paramMap.get("id");
    this.licensetypeService.find(licensetype_id).then(
      data => {
        this.licensetype = new Licensetype(data);
      }
    ).catch(
      error => {
        this.translate.get('Licensetype.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/licensetypes/all'])
      }
    )

  }
}
