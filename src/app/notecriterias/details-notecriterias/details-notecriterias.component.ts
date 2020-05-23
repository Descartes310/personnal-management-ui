import { Component, OnInit } from '@angular/core';
import { NotecriteriasService } from 'src/app/_services/notecriterias.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Notecriterias } from 'src/app/_models/notecriterias.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-notecriterias',
  templateUrl: './details-notecriterias.component.html',
  styleUrls: ['./details-notecriterias.component.scss']
})
export class DetailsNotecriteriasComponent implements OnInit {

  notecriterias:Notecriterias = new Notecriterias();

  constructor(
    private notecriteriasService: NotecriteriasService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const notecriterias_id = +this.route.snapshot.paramMap.get("id");
    this.notecriteriasService.find(notecriterias_id).then(
      data => {
        this.notecriterias = new Notecriterias(data);
      }
    ).catch(
      error => {
        this.translate.get('Notecriterias.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/notecriterias/all'])
      }
    )

  }

  
}
