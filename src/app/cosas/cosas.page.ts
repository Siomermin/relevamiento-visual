import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

type CosasType = 'lindas' | 'feas';

@Component({
  selector: 'app-cosas',
  templateUrl: './cosas.page.html',
  styleUrls: ['./cosas.page.scss'],
})
export class CosasPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  public cosaType!: CosasType;

  public photos: any[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      const cosasType = data['cosasType'];
      this.cosaType = cosasType;
      console.log('Cosas:', this.cosaType);
    });

    Camera.requestPermissions();
  }

  likePhoto(): void {
    alert('likeado');
  }

  async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        webUseInput: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      this.photos.push(image);
      console.log(image);
      // Can be set to the src of an image now
      // imageElement.src = imageUrl;
    };




}
