import * as crypto from 'crypto';       
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { IHashedPassword, IUser, IUserProfile, IVerifyJWT } from 'src/interface';
import { SettingService } from 'src/common/setting';
import * as moment from 'moment';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommonComponents {
    static randCode(): string {
        return crypto.randomBytes(48).toString("hex");
    }
    static async hashedPassword(password: string): Promise<IHashedPassword> {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return {newPassword: hashedPassword, salt: salt}
    }
    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
    static async verifyJWT({token, roles = ["consumer"]}: IVerifyJWT): Promise<object | string> {
        if(!token) throw new CustomError("Token is required", 400)
        const profile: IUserProfile | any = jwt.verify(String(token).replace("Bearer ", ""), SettingService.JWT_SECRET)
        if(!profile) throw new CustomError("Invalid token", 400)
        let user = await prisma.user.findFirst({where: {id: profile.id}})
        if(!user) throw new CustomError("User not found", 400)
        if(user.token !== token) throw new CustomError("Token is expired", 400)
        if(roles && !roles.includes(user.role)) throw new CustomError("You are not authorized to access this resource", 400)
        return profile
    }
    static async signToken(data: IUserProfile, remember?: boolean): Promise<string> {
        const expiresIn = remember ? '7d' : '3d'; // Set expiration to 3 day
        let token: string = jwt.sign(data, SettingService.JWT_SECRET, { expiresIn })
        await prisma.user.update({where: {id: data.id}, data: {token: token}})
        return token
    }
    static async refreshToken(data: IUser): Promise<string> {
        try {
            const lastUpdated = moment(data.updatedOn || data.createdOn);
            const currentTime = moment();
            let referenceTime = lastUpdated;
    
            if (lastUpdated.isValid()) {
                const daysElapsed = currentTime.diff(lastUpdated, 'days');
                if (daysElapsed > SettingService.RTOKEN_EXPIRE) {
                    referenceTime = currentTime;
                }
            }
            const tokenData = `${data.id} ${data.password} ${referenceTime.format("YYYY-MM-DD HH:mm:ss")}`;
            const refreshToken: string = crypto
                .pbkdf2Sync(
                    tokenData,
                    SettingService.JWT_SECRET,
                    10000,
                    100,
                    "sha1"
                )
                .toString("base64");
    
            if (data.rtoken !== refreshToken) {
                // Update the rtoken in the database using Prisma
                await prisma.user.update({
                    where: { id: data.id },
                    data: { rtoken: refreshToken }
                });
            }
            return refreshToken;
        } catch (error) {
            console.error("Error generating refresh token:", error);
            throw new CustomError("Failed to generate refresh token", 400);
        }
    }
}

export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}