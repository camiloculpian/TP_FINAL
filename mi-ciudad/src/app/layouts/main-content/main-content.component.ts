import { NgFor } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonMenu, IonRouterOutlet, IonItem, IonMenuToggle, IonIcon, IonLabel, IonItemDivider, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home , person, exit, trash, notifications } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Notification, NotificationState } from 'src/app/core/interfaces/notification';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  standalone: true,
  imports: [ NgFor, IonIcon, RouterLink, IonItem, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonMenu, IonMenuToggle, IonLabel],
})
export class MainContentComponent implements OnInit {
  
  public notifications: Notification[] = [];
  public unreadNotifications: number = this.notifications.filter(notification => notification.state!=NotificationState.READED).length;
  
  public title!:string;

  public appPages = [
    { title: 'Comercios', url: '/main/home', icon: 'home' },
    { title: 'Notificaciones', url: '/main/notifications', icon: 'notifications', data:{notifications: this.notifications}},
    { title: 'Perfil', url: '/main/profile', icon: 'person' },
  ];
  public labels = [];
  constructor(
    public router: Router,
    private authService: AuthenticationService,
    public readonly route: ActivatedRoute,
    private titleService: Title,
    private notificationsService: NotificationsService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
        this.titleService.setTitle(this.title);
      }
    });

    addIcons({notifications,trash,home,person,exit});
  }

  ngOnInit(): void {
    this.notificationsService.getNotifications().subscribe(
      {
        next: (resp) => {
          resp.data.forEach(
            (notification:Notification) => {
              if(notification?.state != NotificationState.READED){
                this.notifications.push(notification);
                this.unreadNotifications = this.notifications.filter(notification => notification.state!=NotificationState.READED).length;
              } 
              console.log(notification)}
          )
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
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

  goToNotifications(){
    this.router.navigate(['main/notifications', {data:{notifications: this.notifications}}]);
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
