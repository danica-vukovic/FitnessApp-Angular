import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrl: './message-chat.component.css'
})
export class MessageChatComponent {
  messages: any[] = [];
  newMessageContent: string = '';
  userId: number = 0;
  user: any;


  constructor(
    public dialogRef: MatDialogRef<MessageChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any, toConsultant: boolean },
    private messageService: MessageService, private authService: AuthService
  ) {
    const user = authService.getUser();
    if (user != undefined) this.user = user;
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    const userId = this.user.idUser;
    let receiverId = 0;

    if (this.data.toConsultant) {
      receiverId = this.data.user.idCoordinator;
    } else {
      receiverId = this.data.user.idUser;
    }

    this.messageService.getMessagesBetweenUsers(userId, receiverId).subscribe({
      next: (messages) => {
        this.messages = messages
          .filter(message => this.data.toConsultant ? message.toConsultant : !message.toConsultant)
          .sort((a, b) => new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime());
      },
      error: (err) => {
        console.error('Failed to load messages:', err);
      }
    });
  }

  sendMessage(): void {
    let id = 0;
    if (this.data.toConsultant) {
      id = this.data.user.idCoordinator;
    } else {
      id = this.data.user.idUser;
    }
    console.log(id);
    if (this.newMessageContent.trim()) {
      const message = {
        content: this.newMessageContent,
        userId: this.user.idUser,
        receiverId: id,
        toConsultant: this.data.toConsultant
      };

      this.messageService.sendMessage(message).subscribe({
        next: () => {
          this.newMessageContent = '';
          console.log('Loaded messages:');
          this.loadMessages();
        },
        error: (err) => {
          console.error('Failed to send message:', err);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
