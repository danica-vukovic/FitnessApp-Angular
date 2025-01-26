import { Location } from "./program";
import { Level } from "./program";
import { ImageRequest
    
 } from "./image-request";
export class ProgramRequest {
    name: string;
    description: string;
    price: number;
    level: Level;
    duration: number;
    location: Location;
    instructorInformation: string;
    contact: string;
    videoUrl: string;
    categoryId: number;
    userId: number;
    images: ImageRequest[];
  
    constructor(
      name: string,
      description: string,
      price: number,
      level: Level,
      duration: number,
      location: Location,
      instructorInformation: string,
      contact: string,
      videoUrl: string,
      categoryId: number,
      userId: number,
      images: ImageRequest[]
    ) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.level = level;
      this.duration = duration;
      this.location = location;
      this.instructorInformation = instructorInformation;
      this.contact = contact;
      this.videoUrl = videoUrl;
      this.categoryId = categoryId;
      this.userId = userId;
      this.images = images;
    }
  }
  