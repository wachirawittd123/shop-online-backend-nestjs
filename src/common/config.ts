import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as sgMail from '@sendgrid/mail';
import { SettingService } from "./setting";
import { Injectable } from '@nestjs/common';
import { ISendEmail } from 'src/interface';

@Injectable()
export class ConfigService {
    constructor() {
      // Set your SendGrid API key
      sgMail.setApiKey(SettingService.MAIL_KEY);
    }
    static configureMiddleware = (app: any) => {
      const sessionConfig = {
          maxAge: SettingService.MAX_AGE,
          secret: SettingService.JWT_SECRET,
          resave: false, // do not save session if unmodified
          saveUninitialized: false,
      };
      app
        .use(session(sessionConfig))
        .use(express.urlencoded({ extended: true }))
        .use(express.json({ limit: "100mb" }))
        .use(
          express.urlencoded({
            limit: "100mb",
            extended: true,
            parameterLimit: 50000,
          })
        )
        .use(cookieParser());
  }
  static async sendEmail(msg: ISendEmail) {
    sgMail.setApiKey(SettingService.MAIL_KEY);
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error.message);
      if (error.response) {
        console.error('SendGrid response error:', error.response.body);
      }
    }
  }
}
