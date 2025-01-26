
import { Category } from './category';
import { Image } from './image';
import { ImageRequest } from './image-request';
import { User } from './user';

export class Program {
  idProgram: number;
  name: string;
  description: string;
  price: number;
  level: Level;
  duration: number;
  location: Location;
  instructorInformation: string;
  contact: string;
  user: User;
  videoUrl: string;
  category: Category;
  images: Image[];
  completed: boolean;

  constructor(idProgram: number, name: string, description: string, price: number, level: Level, duration: number,location: Location,
     instructorInformation: string, contact: string, user: User, videoUrl: string, category: Category,images: Image[]) {
    this.idProgram = idProgram;
    this.name = name;
    this.description = description;
    this.price = price;
    this.level = level;
    this.duration = duration;
    this.location = location;
    this.instructorInformation = instructorInformation;
    this.contact = contact;
    this.videoUrl = videoUrl;
    this.category = category;
    this.user = user;
    this.images = images;
    this.completed = false;
  }
}

export enum Level {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum Location {
  ONLINE="ONLINE",
  GYM="GYM",
  PARK="PARK"
}
