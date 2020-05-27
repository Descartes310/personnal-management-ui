import { Component, OnInit } from '@angular/core';
import { AssignmentTypeService } from 'src/app/_services/assignmenttype.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { AssignmentType } from 'src/app/_models/assignmenttype.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details-assignmenttype',
  templateUrl: './details-assignmenttype.component.html',
  styleUrls: ['./details-assignmenttype.component.scss']
})
export class DetailsAssignmenttypeComponent implements OnInit {


  assignmenttype:AssignmentType = new AssignmentType();

  constructor(
    private assignmenttypeService: AssignmentTypeService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const assignmenttype_id = +this.route.snapshot.paramMap.get("id");
    this.assignmenttypeService.find(assignmenttype_id).then(
      data => {
        this.assignmenttype = new AssignmentType(data);
      }
    ).catch(
      error => {
        this.translate.get('Assignmenttype.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/assignmenttype/all'])
      }
    )

  }

  
}

