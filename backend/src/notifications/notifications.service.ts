import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { DataSource, Not, Repository } from "typeorm";
import { Notification, NotificationState } from "./entities/notification.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class NotificationsService {

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private usersService: UsersService,
    private dataSource: DataSource
  ) { }

  async sendNotification(sender: User, notification: Notification, receivers: User[]){}

  async getCountNotifications(userId: number): Promise<{total:number, unread:number}> {
    try{
      const user = await this.usersService.findOne(userId);
      const totalNotifications = await this.notificationRepository.count({ where: { receiver: user } });
      const unreadNotifications = await this.notificationRepository.count({ where: { receiver: user, state: Not(NotificationState.READED) } });
      return { total: totalNotifications, unread: unreadNotifications };
    }catch(e){
      throw e;
    }
  }

  async getNotificationsForUser(userId: number): Promise<Notification[]> {
    try{
      // TO-DO: poner dentro de una transaccion...
      const user = await this.usersService.findOne(userId);
      const unreadNotifications = await this.notificationRepository.find({ where: { receiver: user }, select:{ id:true, createdAt:true, receivedAt:true, title:true, subject:true, state:true } });
      unreadNotifications.forEach(notif => {
        notif.receivedAt =  new Date();
        if(notif.state == NotificationState.DELIVERED){
          notif.state = NotificationState.RECEIVED;
        }
        this.notificationRepository.save(notif);
      });
      return unreadNotifications;
    }catch (e){
      throw e;
    }
  }

  async getNotificationForUser(notificationId, userId:number): Promise<Notification> {
    try{
      const user = await this.usersService.findOne(userId);
      const unreadNotification = await this.notificationRepository.findOne({ where: { id: notificationId, receiver: user }, select:{ id:true, createdAt:true, receivedAt:true, title:true, subject:true, message:true ,state:true } });
      this.markNotificationAsRead(notificationId);
      return unreadNotification;
    }catch (e){
      throw e;
    }
  }

  async getNotificationsSendedByUser(userId: number): Promise<Notification[]> {
    try{
      const user = await this.usersService.findOne(userId);
      return await this.notificationRepository.find({ where: { sender: user } });
    }catch (e){
      throw e;
    }
  }

   async markNotificationAsRead(notification: Notification) {
    notification.readedAt = new Date();
    await this.notificationRepository.save(notification);
   }

   async deleteNotification(notification: Notification, user: User) {
    // TO-DO: Chequear que la notificacion pertenezca al usuario que la quiere borrar... 
    await this.notificationRepository.delete(notification);
   }

   async deleteAllNotificationsForUser(user: User) {
    const notifications = await this.notificationRepository.find({ where: { receiver: user } });
    notifications.forEach(notification => 
        this.notificationRepository.delete(notification)
    );
   }

   async getUnreadNotificationsForUser(user: User): Promise<Notification[]> {
    return await this.notificationRepository.find({ where: { receiver: user, readedAt: null } });
   }
   
}