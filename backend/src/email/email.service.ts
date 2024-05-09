/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SMTPS_USER } from '@/constants';

enum EmailTmpl {
  CHECKOUT = 'checkout',
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  send({
    to,
    subject,
    template,
    context,
  }: {
    to: string;
    subject: string;
    template?: EmailTmpl;
    context?: Record<string, unknown>;
  }) {
    return this.mailerService.sendMail({
      to, // list of receivers
      from: SMTPS_USER, // sender address
      subject, // Subject line
      //text, // plaintext body
      template,
      context,
    });
  }

  checkout({
    to,
    context,
  }: {
    to: string;
    context: {
      products: { name: string; price: string }[];
      total: string;
      orderId: string;
    };
  }) {
    return this.send({
      to,
      subject: 'Checkout',
      template: EmailTmpl.CHECKOUT,
      context,
    });
  }
}
