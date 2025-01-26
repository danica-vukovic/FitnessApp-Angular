export class MessageRequest {
    content: string;
    userId: number; 
    receiverId: number;
  
    constructor(
      content: string,
      userId: number,
      receiverId: number
    ) {
      this.content = content;
      this.userId = userId;
      this.receiverId = receiverId;
    }
  }
  