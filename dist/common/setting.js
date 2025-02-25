"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SettingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
let SettingService = class SettingService {
    static { SettingService_1 = this; }
    static envFile = `.env.${env}`;
    static config = dotenv.config({ path: SettingService_1.envFile });
    static TOKEN_EXPIRE = Number(process.env.TOKEN_EXPIRE) || 3600;
    static RTOKEN_EXPIRE = SettingService_1.TOKEN_EXPIRE;
    static PORT = Number(process.env.PORT) || 4000;
    static MAX_AGE = SettingService_1.TOKEN_EXPIRE * 1000;
    static JWT_SECRET = process.env.JWT_SECRET || "";
    static MAIL_API = process.env.MAIL_API || "";
    static MAIL_KEY = process.env.MAIL_KEY || "";
    static MAIL_FROM = process.env.MAIL_FROM || "";
    static APP_NAME = process.env.APP_NAME || "";
    static APP_DESCRIPTION = process.env.APP_DESCRIPTION || "";
    static APP_LOGO = process.env.APP_LOGO || "";
    static APP_MAIN_COLOR = process.env.APP_MAIN_COLOR || "#EF4030";
    static APP_URL = process.env.APP_URL || "";
    static FRONT_END_URL = process.env.FRONT_END_URL || "";
    static ROLE = ["superadmin", "admin", "consumer"];
};
exports.SettingService = SettingService;
exports.SettingService = SettingService = SettingService_1 = __decorate([
    (0, common_1.Injectable)()
], SettingService);
//# sourceMappingURL=setting.js.map