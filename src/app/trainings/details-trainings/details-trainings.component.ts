import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/_models/training.model';
import { TrainingService } from 'src/app/_services/training.service';

@Component({
  selector: 'app-details-trainings',
  templateUrl: './details-trainings.component.html',
  styleUrls: ['./details-trainings.component.scss']
})
export class DetailsTrainingsComponent implements OnInit {
  training: Training = new Training();
  constructor(
    private trainingService: TrainingService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const training_id = +this.route.snapshot.paramMap.get("id");
    this.trainingService.find(training_id).then(
      data => {
        this.training = new Training(data);

      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/trainings/all'])
      }
    )

  }

}
