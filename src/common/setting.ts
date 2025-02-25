import { Injectable } from '@nestjs/common';
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development"; // Default to 'development' if NODE_ENV is undefined

@Injectable()
export class SettingService {
    static envFile: string = `.env.${env}`
    static config: any = dotenv.config({ path: SettingService.envFile })
    static TOKEN_EXPIRE: number = Number(process.env.TOKEN_EXPIRE) || 3600
    static RTOKEN_EXPIRE: number = SettingService.TOKEN_EXPIRE
    static PORT: number = Number(process.env.PORT) || 4000
    static MAX_AGE: number = SettingService.TOKEN_EXPIRE * 1000
    static JWT_SECRET: string = process.env.JWT_SECRET || ""
    static MAIL_API: string = process.env.MAIL_API || ""
    static MAIL_KEY: string = process.env.MAIL_KEY || ""
    static MAIL_FROM: string = process.env.MAIL_FROM || ""
    static APP_NAME: string = process.env.APP_NAME || ""
    static APP_DESCRIPTION: string = process.env.APP_DESCRIPTION || ""
    static APP_LOGO: string = process.env.APP_LOGO || ""
    static APP_MAIN_COLOR: string = process.env.APP_MAIN_COLOR || "#EF4030"
    static APP_URL: string = process.env.APP_URL || ""
    static FRONT_END_URL: string = process.env.FRONT_END_URL || ""
    static ROLE: string[] = ["superadmin", "admin", "consumer"]
}
