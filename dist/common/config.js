"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sgMail = require("@sendgrid/mail");
const setting_1 = require("./setting");
const common_1 = require("@nestjs/common");
let ConfigService = class ConfigService {
    constructor() {
        sgMail.setApiKey(setting_1.SettingService.MAIL_KEY);
    }
    static configureMiddleware = (app) => {
        const sessionConfig = {
            maxAge: setting_1.SettingService.MAX_AGE,
            secret: setting_1.SettingService.JWT_SECRET,
            resave: false,
            saveUninitialized: false,
        };
        app
            .use(session(sessionConfig))
            .use(express.urlencoded({ extended: true }))
            .use(express.json({ limit: "100mb" }))
            .use(express.urlencoded({
            limit: "100mb",
            extended: true,
            parameterLimit: 50000,
        }))
            .use(cookieParser());
    };
    static async sendEmail(msg) {
        sgMail.setApiKey(setting_1.SettingService.MAIL_KEY);
        try {
            await sgMail.send(msg);
            console.log('Email sent successfully');
        }
        catch (error) {
            console.error('Error sending email:', error.message);
            if (error.response) {
                console.error('SendGrid response error:', error.response.body);
            }
        }
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
//# sourceMappingURL=config.js.map