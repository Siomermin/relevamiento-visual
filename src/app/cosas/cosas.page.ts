import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../shared/services/photo.service';
import { FirestoreService } from '../shared/services/firestore.service';
import { CosasType, Photo } from '../shared/interfaces/photo.interface';


@Component({
  selector: 'app-cosas',
  templateUrl: './cosas.page.html',
  styleUrls: ['./cosas.page.scss'],
})
export class CosasPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private photoService = inject(PhotoService);
  private firestoreService = inject(FirestoreService);

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
      this.photos = await this.photoService.getPhotos().toPromise();
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }

  loadPhotosFirestore() {
    try {
      this.firestoreService.getPhotosByType(this.cosaType).subscribe((photos) => {
        console.log(photos);
        this.photos = photos;
      });
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }

  likePhoto(): void {
    alert('likeado');
  }

  async takePhoto() {
    try {
      await this.photoService.takePhoto(this.cosaType);
    } catch (error) {
      console.error('Error adding photo to gallery:', error);
    }
  }
}
