import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/_models/profile.model';

@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrls: ['./details-profile.component.scss']
})
export class DetailsProfileComponent implements OnInit {
  profile: Profile = new Profile();
  constructor(
    private profileService: ProfileService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,) { }

    async ngOnInit() {
      const profile_id = +this.route.snapshot.paramMap.get("id");
      this.profileService.find(profile_id).then(
        data => {
          this.profile = new Profile(data);
          console.log(this.profile);
  
        }
      ).catch(
        error => {
          this.translate.get('Role.'+error.error.code)
          .subscribe(val => this.notifService.danger(val));
          this.router.navigate(['/profiles/all'])
        }
      )
  
    }

  formatter (value) {
      return (value === 1) ? 'Oui' : ((value === 0) ? 'Non' : '');
  }
    

}
