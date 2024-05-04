import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoStorageService } from '../shared/services/photoStorage.service';
import { CosasType, Photo } from '../shared/interfaces/photo.interface';
import { photoFirestoreService } from '../shared/services/photoFirestore.service';
import { LikesService } from '../shared/services/likes.service';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-cosas',
  templateUrl: './cosas.page.html',
  styleUrls: ['./cosas.page.scss'],
})
export class CosasPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private photoStorageService = inject(PhotoStorageService);
  private photoFirestoreService = inject(photoFirestoreService);
  private authService = inject(AuthService); // Inject the LikesService
  private likesService = inject(LikesService); // Inject the LikesService

  public cosaType!: CosasType;
  public photos: Photo[] | undefined = [];

  constructor() {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      const cosasType = data['cosasType'];
      this.cosaType = cosasType;
      console.log('Cosas:', this.cosaType);

      // Call loadPhotos after setting cosaType
      // this.loadPhotos();
      this.loadPhotosFirestore();
    });
  }

  async loadPhotos() {
    try {
      this.photos = await this.photoStorageService.getPhotos().toPromise();
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }

  loadPhotosFirestore() {
    try {
      this.photoFirestoreService.getPhotosByType(this.cosaType).subscribe((photos) => {
        console.log(photos);
        this.photos = photos;
      });
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }

  likePhoto(photo: Photo): void {
    const userEmail = this.authService.loggedUserEmail;// Get the user ID from your authentication service;

    this.likesService.addLike(userEmail, photo.id)
      .then(() => {
        // Update the local likes count
        if (!photo.likes) {
          photo.likes = 1;
        } else {
          photo.likes++;
        }

        // Update Firestore data
        this.photoFirestoreService.updatePhoto(photo);
      })
      .catch(error => {
        console.error('Error liking photo:', error);
      });
  }



  async takePhoto() {
    try {
      await this.photoStorageService.takePhoto(this.cosaType);
    } catch (error) {
      console.error('Error adding photo to gallery:', error);
    }
  }
}
