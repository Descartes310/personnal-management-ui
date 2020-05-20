import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContractService } from 'src/app/_services/contract.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from 'src/app/_models/contract.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-contract',
  templateUrl: './details-contract.component.html',
  styleUrls: ['./details-contract.component.scss']
})
export class DetailsContractComponent implements OnInit {

  contract: Contract = new Contract();

  myForm: FormGroup;
  constructor(
          public formBuilder:FormBuilder,
          private contractService: ContractService,
          private notifService: NotifService,
          private translate: TranslateService,
          private route: ActivatedRoute,
          private router: Router,
          ) {
    this.myForm = this.formBuilder.group({
    content: [null,Validators.required]
    // ….
  });

  }
  async ngOnInit() {
    const contract_id = +this.route.snapshot.paramMap.get("id");
    this.contractService.find(contract_id).then(
      data => {
        this.contract = new Contract(data);
      }
    ).catch(
      error => {
        this.translate.get('Contract.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/contracts/all'])
      }
    )

  }

  /**
  * Function that detect changes on content
  */
  contentChanged(){
    console.log('content is '+ this.myForm.get("content").value);
  }

  download(){
    
    return;

  }
  
 
}


