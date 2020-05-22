import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setting } from 'src/app/_models/setting.model';
import { SettingService } from 'src/app/_services/setting.service';


@Component({
  selector: 'app-details-settings',
  templateUrl: './details-settings.component.html',
  styleUrls: ['./details-settings.component.scss']
})
export class DetailsSettingsComponent implements OnInit {

  setting: Setting = new Setting();
  constructor(
    private settingService: SettingService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const setting_id = +this.route.snapshot.paramMap.get("id");
    this.settingService.find(setting_id).then(
      data => {
        this.setting = new Setting(data);

      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/settings/all'])
      }
    )

  }

}