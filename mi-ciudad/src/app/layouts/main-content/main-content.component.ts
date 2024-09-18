import { NgFor } from '@angular/common';
import { Component} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonMenu, IonRouterOutlet, IonItem, IonMenuToggle, IonIcon, IonLabel, IonItemDivider } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home , person, exit} from 'ionicons/icons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  standalone: true,
  imports: [IonItemDivider, NgFor, IonIcon, RouterLink, IonItem, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonMenu, IonMenuToggle, IonLabel],
})
export class MainContentComponent{
  public activeTitle!: string;
  public title!:string;

  public appPages = [
    { title: 'Home', url: '/main/home', icon: 'home' },
    { title: 'Perfil', url: '/main/profile', icon: 'person' },
  ];
  public labels = [];
  constructor(public router: Router, private authService: AuthenticationService, public readonly route: ActivatedRoute, private titleService: Title) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
        this.titleService.setTitle(this.title);
      }
    });

    addIcons({ home, person, exit });
  }

  private getTitle(state: any, parent: any): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }

    return data;
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  ionViewDidEnter() {
    // this.backButtonSubscription =
    //   this.platform.backButton.subscribeWithPriority(10, () => {
    //     if (this.router.url === '/home') {
    //       (navigator as any).app.exitApp();
    //     }
    //   });
  }
}


