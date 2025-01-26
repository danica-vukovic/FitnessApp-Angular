import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File): Observable<string> {
    return defer(async () => {
      const filePath = `${file.name}`;
      const uploadTask = await this.storage.upload(filePath, file).task;
      const downloadURL = await uploadTask.ref.getDownloadURL();
      return downloadURL;
    });
  }

  getImageUrl(imagePath: string): Observable<string | null> {
    const ref = this.storage.refFromURL(imagePath);
    return ref.getDownloadURL();
  }
}
