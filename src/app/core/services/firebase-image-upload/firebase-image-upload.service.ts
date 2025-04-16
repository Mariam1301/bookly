import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FirebaseImageUploadService {
  constructor(private storage: Storage) {}

  async uploadImage(file: File, pathPrefix = 'uploads'): Promise<string> {
    const filePath = `${pathPrefix}/${uuidv4()}-${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}
