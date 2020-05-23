import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/_models/contract.model';
import { ContractService } from 'src/app/_services/contract.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-contract',
  templateUrl: './all-contract.component.html',
  styleUrls: ['./all-contract.component.scss']
})
export class AllContractComponent implements OnInit {

  contract_tmp: Contract[] = [];
  contracts: Contract[] = [];
  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = ''
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';

  constructor(
    private contractService: ContractService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
        { data: 'contract' }) 
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSure'];
          this.warning = val['SweetAlert.Warning'];
          this.yes = val['SweetAlert.Yes'];
          this.no = val['SweetAlert.No'];
          this.deleted = val['SweetAlert.Deleted'];
          this.deletedMessage = val['SweetAlert.DeletedMessage'];
          this.cancelled = val['SweetAlert.Cancelled'];
          this.cancelledMessage = val['SweetAlert.CancelledMessage'];
        });
   }
   

   ngOnInit() {
    this.getContracts();
  }

  getContracts() {
    this.loading = true;
    this.contractService.all().then(
      response => {
        this.contracts = [];
        this.contract_tmp = [];
        response.data.map( contract => {
          this.contracts.push(new Contract(contract));
          this.contract_tmp.push(new Contract(contract));
        });

      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }
  

  editContract(contract: Contract) {
    this.router.navigate(['/contracts/update/'+contract.id])
  }

  detailsContract(contract: Contract) {
    this.router.navigate(['/contracts/details/'+contract.id])
  }
  

  deleteContract(contract: Contract) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.contractService.delete(contract.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getContracts();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Contract.'+error.error.code)
            .subscribe(val => this.notifService.danger(val));
          }
        )
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        )
      }
    })
  }

  search(event) {
    this.contracts = this.contract_tmp;
    this.contracts = this.contract_tmp.filter( contract => contract.type.toLowerCase().includes(event.target.value.toLowerCase()));
  }
}

