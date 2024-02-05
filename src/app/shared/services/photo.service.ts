import { Injectable, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable, forkJoin, from, map, switchMap, tap } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { CosasType, Photo } from '../interfaces/photo.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private afStorage = inject(AngularFireStorage);
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);

  public async takePhoto(cosaType: CosasType) {
    try {
      // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      // Upload the photo to AngularFireStorage
      const storagePath = `photos/${new Date().getTime()}.jpg`; // Provide a unique storage path
      const imageBlob = await fetch(capturedPhoto.webPath!).then((response) =>
        response.blob()
      );
      const uploadTask = this.afStorage.upload(storagePath, imageBlob);

      await uploadTask;

      // Photo uploaded successfully, get the download URL
      const downloadURL$ = await this.afStorage
        .ref(storagePath)
        .getDownloadURL();

        downloadURL$.subscribe(
          (downloadUrl) => {
            console.log('Download URL:', downloadUrl);

            const photo: Photo = {
              url: downloadUrl,
              type: cosaType,
              author: this.authService.loggedUserEmail,
              likes: 0
            };

            // Add the photo object to Firestore
            this.firestoreService.addPhoto(photo).then(() => {
              console.log('Photo added to Firestore.');
            });
          },
          (error) => {
            console.error('Error getting download URL:', error);
          }
        );

        return;
      } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
      }
    }


  public getPhotos(): Observable<any[]> {
    const storageRef = this.afStorage.ref('photos/');
    return storageRef.listAll().pipe(
      switchMap((result) => {
        const downloadURLs: Observable<string>[] = result.items.map((item) => {
          return from(item.getDownloadURL());
        });
        return forkJoin(downloadURLs).pipe(map((urls: string[]) => urls));
      })
    );
  }
}
