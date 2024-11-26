import { Controller, Get, UseGuards, BadRequestException, } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import { NotificationsService } from "./notifications.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/decorators/currentUser.decorator";
import { Response, responseStatus } from "src/common/responses/responses";

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly i18n: I18nService
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getNotificationsForUser(@CurrentUser('sub') currentUser: number) {
    try {
      console.log(await this.notificationsService.getNotificationsForUser(currentUser))
      return new Response({
        statusCode: 200,
        status: responseStatus.OK,
        message: this.i18n.t('lang.notificationsUnreads.ReadOK', { lang: I18nContext.current().lang}),
        data: await this.notificationsService.getNotificationsForUser(currentUser)
      });
    }catch(error){
      throw new BadRequestException({
        'status': 'ERROR',
        'message': error.message,
        'statusCode': error.statusCode,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('/count')
  async getCountNotifications(@CurrentUser('sub') currentUser: number){
    try {
      return new Response({
        statusCode: 200,
        status: responseStatus.OK,
        message: this.i18n.t('lang.notificationsUnreads.CountOK', { lang: I18nContext.current().lang}),
        data: await this.notificationsService.getCountNotifications(currentUser)
      });
    }catch(error){
      throw new BadRequestException({
        'status': 'ERROR',
        'message': error.message,
        'statusCode': error.statusCode,
      });
    }
  }

}