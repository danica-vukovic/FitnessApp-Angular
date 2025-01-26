export class Comment {
    username: string;
    content: string;
    dateTime: string;
  
    constructor(username: string, content: string, dateTime: string) {
      this.username = username;
      this.content = content;
      this.dateTime = dateTime;
    }
  }
  