import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { License } from 'src/app/_models/license.model';
import { LicenseService } from 'src/app/_services/license.service';
import * as Route from '../../Routes'
@Component({
  selector: 'app-details-licenses',
  templateUrl: './details-licenses.component.html',
  styleUrls: ['./details-licenses.component.scss']
})
export class DetailsLicensesComponent implements OnInit {

  license: License = new License();
  server = Route.ROOT;
  constructor(
    private licenseService: LicenseService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const license_id = +this.route.snapshot.paramMap.get("id");
    this.licenseService.find(license_id).then(
      data => {
        this.license = new License(data);
        console.log(this.license)
      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/licenses/all'])
      }
    )

  }


}