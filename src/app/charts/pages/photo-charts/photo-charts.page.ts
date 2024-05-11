import { Component, OnInit, inject } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Photo } from 'src/app/shared/interfaces/photo.interface';
import { photoFirestoreService } from 'src/app/shared/services/photoFirestore.service';

@Component({
  selector: 'app-photo-charts',
  templateUrl: './photo-charts.page.html',
  styleUrls: ['./photo-charts.page.scss'],
})
export class PhotoChartsPage implements OnInit {
  private photoFirestoreService = inject(photoFirestoreService);


  single: any[] = [];
  // options
  gradient: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;


  view: any = [400, 400];



  // options
  multi: any[] = [];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showYAxisLabel: boolean = true;


  ngOnInit(): void {
    this.photoFirestoreService.getPhotosByType('lindas').subscribe(photos => {
      // Map your data to ngx-charts format
      this.single = photos.map(photo => ({
        name: photo.author, // or any property you want to display
        value: photo.likes || 0, // adjust based on your data
      }));

    });

    this.photoFirestoreService.getPhotosByType('feas').subscribe(photos => {

      this.multi = photos.map(photo => ({
        name: photo.author, // or any property you want to display
        series: [
          {
            name: photo.author,
            value:  photo.likes || 0
          }
         ], // adjust based on your data
      }));
    });
  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
