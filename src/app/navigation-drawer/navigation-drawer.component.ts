import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss']
})
export class NavigationDrawerComponent implements OnInit {

  users: any[] = [];
  users_tmp: any[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) { }

  closeButton: HTMLElement;

  ngOnInit() {
    this.closeButton = document.getElementById('closable') as HTMLElement;
    this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers().then(
      data => {
        let user_id = this.authService.getUser().id;
        this.users = data.filter(user => user.id != user_id);
        this.users_tmp = this.users;
      }
    )
  }

  search(event) {
    this.users = this.users_tmp;
    this.users = this.users_tmp.filter( user => (user.first_name+' '+user.last_name).toLowerCase().includes(event.target.value.toLowerCase()));
  }

  selectUser(id: number){
    this.chatService.newDiscussion([this.users, id])
    this.closeButton.click()
  }

}
