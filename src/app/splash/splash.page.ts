import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  public router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 3000);
  }

}
