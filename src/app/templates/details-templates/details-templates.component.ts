<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/_models/training.model';
import { TrainingService } from 'src/app/_services/training.service';
import { Template } from 'src/app/_models/template.model';
import { TemplateService } from 'src/app/_services/template.service';

@Component({
  selector: 'app-details-templates',
  templateUrl: './details-templates.component.html',
  styleUrls: ['./details-templates.component.scss']
})
export class DetailsTemplatesComponent implements OnInit {
  template: Template = new Template();
  constructor(
    private templateService: TemplateService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const template_id = +this.route.snapshot.paramMap.get("id");
    this.templateService.find(template_id).then(
      data => {
        this.template = new Template(data);

      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/templates/all'])
      }
    )

  }

}
=======
import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from 'src/app/_models/template.model';
import { TemplateService } from 'src/app/_services/template.service';

@Component({
  selector: 'app-details-templates',
  templateUrl: './details-templates.component.html',
  styleUrls: ['./details-templates.component.scss']
})
export class DetailsTemplatesComponent implements OnInit {
  template: Template = new Template();
  constructor(
    private templateService: TemplateService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const template_id = +this.route.snapshot.paramMap.get("id");
    this.templateService.find(template_id).then(
      data => {
        this.template = new Template(data);

      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/templates/all'])
      }
    )

  }

}
>>>>>>> cc1a41d96a434b90b49af843ecabca751037be02
