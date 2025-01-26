import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageChatComponent } from '../message-chat/message-chat.component';
import { AdvisorService } from '../../services/advisor.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  users: any[] = [];
  advisors: any[] = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private advisorService: AdvisorService,
  ) {
 
   }

  ngOnInit(): void {
    this.loadUsers();
    this.loadAdvisors();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

    loadAdvisors(): void {
      this.advisorService.getAdvisors().subscribe(advisors => {
        this.advisors = advisors;
      });
    }
  

  openChat(user: any, toConsultant: boolean): void {
    const dialogRef = this.dialog.open(MessageChatComponent, {
      width: '600px',
      data: { user , toConsultant} 
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Chat dialog closed');
    });
  }

}
