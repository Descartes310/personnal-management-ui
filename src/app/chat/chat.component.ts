import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class ChatComponent implements OnInit, AfterViewChecked {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('myScroll', {static: false}) private myScrollContainer: ElementRef;

  current_user = null;
  current_discussion = null;
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

  getDiscussionInterval = setInterval(() => {
    this.getDiscussions();
  }, 5000);

  getMessageInterval = null;

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

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }  

  scrollToBottom(): void {
    try {
      if(this.myScrollContainer.nativeElement.scrollTop > this.myScrollContainer.nativeElement.scrollHeight) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }                 
  }

  ngOnInit() {

    this.user_id = this.authService.getUser().id;
    this.chatService.getEmittedValue().subscribe(value => {
      this.current_user = value[0].filter(user => user.id == value[1])[0] // value[0] contains a list of user and value[1] contains id of selected user from drawer
      this.users = value[0];
      let discussion = this.discussions_tmp.filter( discussion => discussion.user.id == this.current_user.id)[0];
      if(discussion != null) {
        this.getDiscussion(discussion)
      } else {
        this.current_discussion = null;
        this.messages = [];
      }
    });
    this.getDiscussions();
  }

  public ngOnDestroy() {
    clearInterval(this.getDiscussionInterval);
    clearInterval(this.getMessageInterval);
  }

  search(event) {
    this.discussions = this.discussions_tmp;
    this.discussions = this.discussions_tmp.filter( user => (user.first_name+' '+user.last_name).toLowerCase().includes(event.target.value.toLowerCase()));
  }

  getDiscussions(){
    this.chatService.getDiscussions(this.user_id).then(
      data => {
        this.discussions = data;
        this.discussions_tmp = data;
      }
    )
  }

  closeDiscussion() {
    this.current_user = null;
    this.current_discussion = null;
    clearInterval(this.getMessageInterval);
  }

  deleteMessage(message: Message) {
    this.chatService.deleteMessage(message.id).then(
      data => {
        this.messages.splice(this.messages.indexOf(message), 1);
        this.translate.get('Chat.MessageDeleteSuccess')
              .subscribe(val => this.notifService.success(val));

  
      }
    ).catch(
      error => {
        console.log(error)
        this.translate.get('Chat.MessageDeleteError')
              .subscribe(val => this.notifService.danger(val));
      }
    )
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
              this.translate.get('Chat.DiscussionDeleteError')
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

  getNewMessage() {
    this.chatService.getNewMessage(this.current_discussion.id).then(
      data => {
        if(data.length > 0) {
          data.map( message => this.messages.push(new Message(message)));
        }
  
      }
    )
  }

  getDiscussion(discussion: any) {
    this.isLoading = true;
    this.current_discussion = discussion;
    this.current_user = discussion.user;
    this.messages = [];
    this.chatService.getDiscussion(discussion.id).then(
      data => {
        this.discussion = data;
        data.messages.map( message => this.messages.push(new Message(message)))
        this.getMessageInterval = setInterval(() => {
          this.getNewMessage();
        }, 3000);
        this.scrollToBottom();
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
    this.current_discussion != null ? formData.set("discussion_id", this.current_discussion.id+"") : null;
    this.chatService.postMessage(formData).then(
      data => {
        this.messages.push(new Message(data));
        this.current_message = ''
        this.translate.get('Chat.MessageSent')
              .subscribe(val => this.notifService.success(val));
        this.getDiscussions();
  
      }
    ).catch(
      error => {
        console.log(error)
        this.translate.get('Chat.MessageSendError')
              .subscribe(val => this.notifService.danger(val));
      }
    )
  }

  isMyMessage(message: Message) {
    return message.sender_id == this.user_id;
  }


  toShow(message: Message) {
    if(this.isMyMessage(message)) {
      return !message.sender_delete;
    } else {
      return !message.receiver_delete && !message.sender_delete;
    }
  }

}
