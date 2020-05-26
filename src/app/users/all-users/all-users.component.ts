import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
*/
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

	public users: any[] = [];
	public users_tmp: any[] = [];
	public loading: boolean = true;
	@BlockUI() blockUI: NgBlockUI;

	//SweetAlert Text
	public areYouSure = '';
	public warning = ''
	public yes = '';
	public no = '';
	public deleted = '';
	public deletedMessage = '';
	public cancelled = '';
	public cancelledMessage = '';


  	constructor(
	    private userService: UserService,
	    private notifService: NotifService,
	    private translate: TranslateService,
	    private router: Router
	) {

	    this.translate.get(
	        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
	        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
	        { data: 'role' })
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
		this.getUsers();
	}

	public getUsers() {

	    this.userService.all().then(
	      data => {
			this.users = data;
			console.log(data)
	        this.users.map(user => {
	        	this.computeDate(user);
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

	editUser(user: any) {
		this.router.navigate(['/users/update/' + user.id])
	}

	detailsUser(user: any) {
		this.router.navigate(['/users/details/' + user.id])
	}

  	deleteUser(user: any) {

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
		        this.userService.delete(user.id).then(
		          data => {
		            this.blockUI.stop();
		            Swal.fire(
		              this.deleted,
		              this.deletedMessage,
		              'success'
		            )
		            this.getUsers();
		          }
		        ).catch(
		          error => {
		            console.log(error)
		            this.blockUI.stop();
		            this.translate.get('User.' + error.error.code)
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

  	public computeDate(user: any) {
  		let date: any = new Date(user.created_at);
        date = this.pad(date.getDate(), 2, '0') +'-'+this.pad(date.getMonth() + 1, 2, '0')+'-'+ date.getFullYear()+' at '+date.getHours()+':'+date.getMinutes();
        user.created_at = date;
  	}

  	public pad(s, width, character) {
        return new Array(width - s.toString().length + 1).join(character) + s;
    }
}
