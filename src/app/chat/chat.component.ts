import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { AuthService } from '../_services/auth.service';
import { Message } from '../_models/message.model';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NotifService } from '../_services/notif.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  current_user = null;
  isLoading: boolean = false;
  current_message = '';
  discussions: any[] = [];
  discussions_tmp: any[] = [];
  users: any[] = [];
  discussion: number = null;
  messages: Message[] = [];
  user_id: number = null;

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
    private chatService: ChatService,
    private authService: AuthService,
    private notifService: NotifService,
    private translate: TranslateService
  ) { 

    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
      'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
      { data: 'discussion' })
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
    this.user_id = this.authService.getUser().id;
    this.chatService.getEmittedValue().subscribe(value => {
      this.current_user = value[0].filter(user => user.id == value[1])[0] // value[0] contains a list of user and value[1] contains id of selected user from drawer
      this.users = value[0];
      let discussion = this.discussions_tmp.filter( discussion => discussion.user.id == this.current_user.id)[0];
      discussion != null ? this.getDiscussion(discussion) : this.messages = [];
    });
    this.getDiscussions();
  }

  search(event) {
    this.discussions = this.discussions_tmp;
    this.discussions = this.discussions_tmp.filter( user => (user.first_name+' '+user.last_name).toLowerCase().includes(event.target.value.toLowerCase()));
  }

  getDiscussions(){
    this.chatService.getDiscussions(this.user_id).then(
      data => {
        console.log(data)
        this.discussions = data;
        this.discussions_tmp = data;
      }
    )
  }

  closeDiscussion() {
    this.current_user = null;
  }
  deleteDiscussion() {
    let discussion = this.discussions_tmp.filter( discussion => discussion.user.id == this.current_user.id)[0];
    if(discussion != null){
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
          this.chatService.deleteDiscussion(discussion.id).then(
            data => {
              console.log(data)
              this.current_user = null;
              this.messages = [];
              this.blockUI.stop();
              Swal.fire(
                this.deleted,
                this.deletedMessage,
                'success'
              )
              this.getDiscussions();
            }
          ).catch(
            err => { 
              console.log(err)
              this.blockUI.stop();
              this.translate.get('Role.'+err.error.code)
              .subscribe(val => this.notifService.danger(val));
            }
          );
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            this.cancelled,
            this.cancelledMessage,
            'error'
          )
        }
      })
    }
  }

  getDiscussion(discussion: any) {
    this.isLoading = true;
    this.current_user = discussion.user;
    this.messages = [];
    this.chatService.getDiscussion(discussion.id).then(
      data => {
        this.discussion = data;
        data.messages.map( message => this.messages.push(new Message(message)))
        this.getDiscussions();
      } 
    ).catch (
      error => {
        console.log(error)
      }
    ).finally( () => {
      this.isLoading = false;
    })
  }

  sendMessage(event) {
    this.current_message = event.target.value;
    let formData = new FormData();
    formData.set('sender_id', this.user_id+"");
    formData.set('receiver_id', this.current_user.id);
    formData.set('message', this.current_message);
    this.current_user.discussion_id != null ? formData.set("discussion_id", this.current_user.discussion_id+"") : null;
    this.chatService.postMessage(formData).then(
      data => {
        this.messages.push(new Message(data));
        this.current_message = ''
        this.getDiscussions();
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  isMyMessage(message: Message) {
    return message.sender_id == this.user_id;
  }

}
