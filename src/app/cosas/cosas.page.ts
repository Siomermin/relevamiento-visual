import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoStorageService } from '../shared/services/photoStorage.service';
import { CosasType, Photo } from '../shared/interfaces/photo.interface';
import { photoFirestoreService } from '../shared/services/photoFirestore.service';
import { LikesService } from '../shared/services/likes.service';
import { AuthService } from '../auth/services/auth.service';
import { ToastService } from '../shared/services/toast.service';


@Component({
  selector: 'app-cosas',
  templateUrl: './cosas.page.html',
  styleUrls: ['./cosas.page.scss'],
})
export class CosasPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private photoStorageService = inject(PhotoStorageService);
  private photoFirestoreService = inject(photoFirestoreService);
  private authService = inject(AuthService);
  private likesService = inject(LikesService);
  private toastService = inject(ToastService);

  public isLoading: boolean = false;
  public cosaType!: CosasType;
  public photos: Photo[] | undefined = [];

  constructor() {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.isLoading = true;
      const cosasType = data['cosasType'];
      this.cosaType = cosasType;
      console.log('Cosas:', this.cosaType);

      // Call loadPhotos after setting cosaType
      // this.loadPhotos();
      setTimeout(() => {
        this.loadPhotosFirestore();
      }, 2000);
    });
  }

  async loadPhotos() {
    try {
      this.photos = await this.photoStorageService.getPhotos().toPromise();
    } catch (error) {
      this.toastService.presentToast('Error al cargar las fotos!', 'middle', 'danger');
      console.error('Error loading photos:', error);
    }
  }

  loadPhotosFirestore() {
    try {
      this.photoFirestoreService.getPhotosByType(this.cosaType).subscribe((photos) => {
        console.log(photos);
        this.photos = photos;
        this.isLoading = false;
      });
    } catch (error) {
      this.toastService.presentToast('Error al cargar las fotos!', 'middle', 'danger');
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
        this.toastService.presentToast('El usuario ya dio me gusta a esta foto!', 'middle', 'danger');
      });
  }

  async takePhoto() {
    try {
      this.isLoading = true;
      await this.photoStorageService.takePhoto(this.cosaType);
      this.isLoading = false;
      this.toastService.presentToast('Foto subida exitosamente!', 'middle', 'success');
    } catch (error) {
      console.error('Error adding photo to gallery:', error);
      this.toastService.presentToast('Error al agregar la foto a la galeria!', 'middle', 'danger');
    }
  }


  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); //+ ' ' + date.toLocaleTimeString();
  }
}
