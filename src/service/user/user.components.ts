import { Injectable } from '@nestjs/common';
import { ICreateNewParliamentUser, ICreateNewUser, ICreateUserVerify, IHandleExistingUser, IQuerys, ISendVerifyEmail, IUpdateUserVerify, IUser, IUserProfile } from 'src/interface';
import { PrismaService } from '../../common/prisma.service';
import { Prisma } from '@prisma/client';
import { CommonComponents } from '../common.components';
import { CustomError } from '../common.components';
import { ConfigService } from 'src/common/config';
import { EmailComponents } from '../email.components';
import { SettingService } from 'src/common/setting';
import { UserField } from 'src/fields/user.field';

@Injectable()
export class UserComponents {
    constructor() {}
    
    static genUserQuery(args: IQuerys): IQuerys| any {
        let where: any = {}
        if (args.query && args.query?.toString().length > 0) {
            where = {
                ...args.where,
                OR: [
                    { email: { contains: args.query, mode: "insensitive" } },
                    { name: { contains: args.query, mode: "insensitive" } },
                    { phone: { contains: args.query, mode: "insensitive" } },
                    { type: { contains: args.query, mode: "insensitive" } },
                    { verify: { status: args.query } },
                ],
            }
        }
        return where
    }
    static async findUser(prisma: PrismaService, where: any): Promise<IUser | any> {
        const user = await prisma.user.findFirst({
            where: where,
            include: {
                verify: true, // Include the UserVerify relation
            },
        })
        return user
    }
    static async getProfile(prisma: PrismaService, where: any): Promise<IUserProfile | any> {
        return await prisma.user.findFirst(
            { 
                where: where,
                select: UserField.selectFieldGetProfile()
            },
        )
    }
    static async getParliamentUserCount(prisma: PrismaService): Promise<number> {
        try {
            const counts = await prisma.user.groupBy({
                by: ['type'],
                where: {
                    type: { in: ["new_user_parliament", "old_user_parliament"] }
                },
                _count: {
                    type: true
                }
            });
    
            return counts.reduce((acc, curr) => acc + curr._count.type, 0);
        } catch (error) {
            console.error("Error fetching parliament user count:", error);
            throw new CustomError("Failed to fetch parliament user count", 400);
        }
    }
    static async handleExistingUser({ prisma, checkUser, email }: IHandleExistingUser): Promise<void> {
        if (checkUser.type && checkUser.type.includes("user_parliament")) {
            throw new CustomError("คุณลงทะเบียนรับสิทธิ์แล้ว ไม่สามารถรับฟรี Token ได้อีก", 400);
        } else {

            prisma.user.update({
                where: { email },
                data: {
                    originCreditBalance: checkUser.creditBalance,
                    creditBalance: { increment: 2500 },
                    type: "old_user_parliament"
                }
            });
            await UserComponents.updateUserVerify({prisma, userId: checkUser.id})
            throw new CustomError("Account already exists", 400);
        }
    }
    static async createNewParliamentUser({prisma, email, password, phone, name}: ICreateNewParliamentUser): Promise<any> {
        let newPwd = await CommonComponents.hashedPassword(password)
        let userData: Prisma.UserCreateInput = {
            email,
            password: newPwd.newPassword,
            salt: newPwd.salt,
            phone,
            name,
            status: "active",
            provider: "local",
        }
        const newUser = await prisma.user.create({
            data: userData
        });
        const verify = await UserComponents.createUserVerify({prisma, code: "", userId: newUser.id, status: true})
        await prisma.user.update({
            where: { email },
            data: {
                verifyId: verify.id?.toString(),
                // consumersId: resultConsumer?.id?.toString(),
                consumersId: "",
                creditBalance: 2500,
                type: "new_user_parliament"
            }
        });
        return newUser;
    }
    static async createNewUser({prisma, email, password, phone, name}: ICreateNewUser): Promise<any> {
        let newPwd = await CommonComponents.hashedPassword(password)
        let code = CommonComponents.randCode()
        await ConfigService.sendEmail({
            from: `"iApp AI API" <${SettingService.MAIL_FROM || "info@iapp.co.th"}>`,
            to: email,
            subject: `iApp-Thank you for your registration`,
            html: EmailComponents.formatVerifyEmail({
                title: "Thank You For Your Registration",
                description: `Confirm Your Registration ${SettingService.APP_NAME}. Please click the link below to confirm registration`,
                subTitle: "",
                uri: `${SettingService.FRONT_END_URL}/confirm/${code}?to=${email}`,
                buttonText: "Confirm",
                endCredit: true,
            }),
        })
        let userData: Prisma.UserCreateInput = {
            email,
            password: newPwd.newPassword,
            salt: newPwd.salt,
            phone,
            name,
            creditBalance: 100,
            notification: true,
            allNotification: true,
            status: "active",
            provider: "local",
            type: "new_user",
        }
        let newUser = await prisma.user.create({
            data: userData
        })
        let verify = await UserComponents.createUserVerify({prisma, code: code, userId: newUser.id, status: false})
        await prisma.user.update({
            where: { id: newUser.id },
            data: { verifyId: verify.id?.toString() }
        });
        return newUser
    }
    static async sendVerifyEmail({prisma, email}: ISendVerifyEmail): Promise<any> {
        let user = await UserComponents.findUser(prisma as PrismaService, { email })
        if(!user) throw new CustomError("User not found", 400)
        if(email && user.verifyId) {
            let code = CommonComponents.randCode()
            await ConfigService.sendEmail({
                from: `"iApp AI API" <${SettingService.MAIL_FROM || "info@iapp.co.th"}>`,
                to: email,
                subject: `iApp-Thank you for your registration`,
                html: EmailComponents.formatVerifyEmail({
                    title: "Thank You For Your Registration",
                    description: `Confirm Your Registration ${SettingService.APP_NAME}. Please click the link below to confirm registration`,
                    subTitle: "",
                    uri: `${SettingService.FRONT_END_URL}/confirm/${code}?to=${email}`,
                    buttonText: "Confirm",
                    endCredit: true,
                }),
            })
        }
        return user
    }
    static async createUserVerify({prisma, code = "", userId, status = false}: ICreateUserVerify): Promise<any> {
        return await prisma.userVerify.create({
            data: {
                code: code,
                status: status,
                user: { connect: { id: userId } }
            }
        })
    }
    static async updateUserVerify({ prisma, userId, code }: IUpdateUserVerify): Promise<any> {
        const userVerifyRecord = await prisma.userVerify.findFirst({
            where: { status: false, userId, code: code },
        });
        if (!userVerifyRecord) {
            throw new CustomError("User verification record not found", 404);
        }
    
        const updatedRecord = await prisma.userVerify.update({
            where: { id: userVerifyRecord.id },
            data: { status: true, code: '' },
        });
        if (!updatedRecord) {
            throw new CustomError("User verification update failed", 500);
        }
        return updatedRecord;
    }
    
}