export class CommentRequest {
    content: string;
    userId: number;
    programId: number;
  
    constructor(content: string, userId: number, programId: number) {
      this.content = content;
      this.userId = userId;
      this.programId = programId;
    }
  }
  