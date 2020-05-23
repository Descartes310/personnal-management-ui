import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/_models/assignment.model';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-assignment',
  templateUrl: './details-assignment.component.html',
  styleUrls: ['./details-assignment.component.scss']
})
export class DetailsAssignmentComponent implements OnInit {

  users: any[] = [];

  assignment: Assignment = new Assignment();


  constructor(
    private assignmentService: AssignmentService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const assignment_id = +this.route.snapshot.paramMap.get("id");
    this.assignmentService.find(assignment_id).then(
      data => {
        this.assignment = new Assignment(data);
        this.users = this.assignment.users;
      }
    ).catch(
      error => {
        this.translate.get('Assignment.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/assignments/all'])
      }
    )
  }

}