import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-contract',
  templateUrl: './details-contract.component.html',
  styleUrls: ['./details-contract.component.scss']
})
export class DetailsContractComponent implements OnInit {

  myForm: FormGroup;
  constructor(public formBuilder:FormBuilder) {
    this.myForm = this.formBuilder.group({
    content: [null,Validators.required]
    // ….
  });

  }
  ngOnInit() {
  }

  /**
  * Function that detect changes on content
  */
  contentChanged(){
    console.log('content is '+ this.myForm.get("content").value);
  }
 
}
