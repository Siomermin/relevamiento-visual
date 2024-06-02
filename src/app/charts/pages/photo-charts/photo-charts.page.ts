import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Photo } from 'src/app/shared/interfaces/photo.interface';
import { photoFirestoreService } from 'src/app/shared/services/photoFirestore.service';
import { AlertController, IonicSafeString } from '@ionic/angular';

@Component({
  selector: 'app-photo-charts',
  templateUrl: './photo-charts.page.html',
  styleUrls: ['./photo-charts.page.scss'],
})
export class PhotoChartsPage implements OnInit, OnDestroy {
  private photoFirestoreService = inject(photoFirestoreService);
  private alertController = inject(AlertController);
  private subscriptions: Subscription = new Subscription();

  single: any[] = [];
  multi: any[] = [];

  gradient: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showYAxisLabel: boolean = true;
  view: any = [400, 400];

  private isAlertPresenting: boolean = false; // Flag to track alert state

  ngOnInit(): void {
    const lindasSubscription = this.photoFirestoreService.getPhotosByType('lindas').subscribe((photos) => {
      this.single = photos.map((photo) => ({
        name: photo.filename,
        value: photo.likes || 0,
      }));
    });

    const feasSubscription = this.photoFirestoreService.getPhotosByType('feas').subscribe((photos) => {
      this.multi = photos.map((photo) => ({
        name: '',
        series: [
          {
            name: photo.filename,
            value: photo.likes || 0,
          },
        ],
      }));
    });

    this.subscriptions.add(lindasSubscription);
    this.subscriptions.add(feasSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSelect(data: any) {
    if (this.isAlertPresenting) {
      return; // Prevent multiple alerts
    }

    const clickedFilename = data.series ? data.series[0].name : data.name;

    try {
      const photoSubscription = this.photoFirestoreService.getPhotoByFilename(clickedFilename).subscribe(photo => {
        if (photo && !this.isAlertPresenting) {
          console.log(photo);
          this.presentPhotoAlert(photo);
        } else {
          console.error('Photo not found with filename:', clickedFilename);
        }
      });

      this.subscriptions.add(photoSubscription);
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  }

  async presentPhotoAlert(photo: Photo) {
    if (!photo) {
      console.error('No photo found for selected filename.');
      return;
    }

    this.isAlertPresenting = true; // Set flag to true when alert is being presented

    const alert = await this.alertController.create({
      backdropDismiss: true,
      message: new IonicSafeString(`<img src="${photo.url}" alt="photo" style="height: 300px; width: auto;" />`),
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss(); // Wait for alert to be dismissed
    this.isAlertPresenting = false; // Reset flag when alert is dismissed
  }
}
