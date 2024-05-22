import { Component, Input, OnInit, inject } from '@angular/core';
import { Photo } from 'src/app/shared/interfaces/photo.interface';
import { photoFirestoreService } from 'src/app/shared/services/photoFirestore.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.scss'],
})
export class UserPhotosComponent  implements OnInit {

  private photoFirestoreService = inject(photoFirestoreService);
  public loggedUser?: any = JSON.parse(localStorage.getItem('loggedUser')!)
  public isLoading: boolean = false;
  private toastService = inject(ToastService);
  public photos: Photo[] | undefined = [];

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.loadPhotosFirestore();
    }, 2000);
  }


  loadPhotosFirestore() {
    try {
      this.photoFirestoreService.getPhotosByAuthor(this.loggedUser.email).subscribe((photos) => {
        console.log(photos);
        this.photos = photos;
        this.isLoading = false;
      });
    } catch (error) {
      this.toastService.presentToast('Error al cargar las fotos!', 'middle', 'danger');
      console.error('Error loading photos:', error);
    }
  }

  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); //+ ' ' + date.toLocaleTimeString();
  }
}
