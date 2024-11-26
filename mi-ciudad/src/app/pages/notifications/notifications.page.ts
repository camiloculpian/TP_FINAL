import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel, NavParams } from '@ionic/angular/standalone';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Notification, NotificationState } from 'src/app/core/interfaces/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  providers:[NavParams],
  imports: [IonLabel, IonItem, IonList, IonContent, NgFor, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {
  @Input({ required: true }) notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) { 
    
  }

  ngOnInit() {
    this.notificationsService.getNotifications().subscribe(
      {
        next: (resp) => {
          resp.data.forEach(
            (notification:Notification) => {
              if(notification?.state != NotificationState.READED){
                this.notifications.push(notification);
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

}
