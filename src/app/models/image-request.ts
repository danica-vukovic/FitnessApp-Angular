export class ImageRequest {
    url: string;
    programId: number;
  
    constructor(imageUrl: string, programId: number) {
      this.url = imageUrl;
      this.programId = programId;
    }
  }