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
var UserComponents_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComponents = void 0;
const common_1 = require("@nestjs/common");
const common_components_1 = require("../common.components");
const common_components_2 = require("../common.components");
const config_1 = require("../../common/config");
const email_components_1 = require("../email.components");
const setting_1 = require("../../common/setting");
const user_field_1 = require("../../fields/user.field");
let UserComponents = UserComponents_1 = class UserComponents {
    constructor() { }
    static genUserQuery(args) {
        let where = {};
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
            };
        }
        return where;
    }
    static async findUser(prisma, where) {
        const user = await prisma.user.findFirst({
            where: where,
            include: {
                verify: true,
            },
        });
        return user;
    }
    static async getProfile(prisma, where) {
        return await prisma.user.findFirst({
            where: where,
            select: user_field_1.UserField.selectFieldGetProfile()
        });
    }
    static async getParliamentUserCount(prisma) {
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
        }
        catch (error) {
            console.error("Error fetching parliament user count:", error);
            throw new common_components_2.CustomError("Failed to fetch parliament user count", 400);
        }
    }
    static async handleExistingUser({ prisma, checkUser, email }) {
        if (checkUser.type && checkUser.type.includes("user_parliament")) {
            throw new common_components_2.CustomError("คุณลงทะเบียนรับสิทธิ์แล้ว ไม่สามารถรับฟรี Token ได้อีก", 400);
        }
        else {
            prisma.user.update({
                where: { email },
                data: {
                    originCreditBalance: checkUser.creditBalance,
                    creditBalance: { increment: 2500 },
                    type: "old_user_parliament"
                }
            });
            await UserComponents_1.updateUserVerify({ prisma, userId: checkUser.id });
            throw new common_components_2.CustomError("Account already exists", 400);
        }
    }
    static async createNewParliamentUser({ prisma, email, password, phone, name }) {
        let newPwd = await common_components_1.CommonComponents.hashedPassword(password);
        let userData = {
            email,
            password: newPwd.newPassword,
            salt: newPwd.salt,
            phone,
            name,
            status: "active",
            provider: "local",
        };
        const newUser = await prisma.user.create({
            data: userData
        });
        const verify = await UserComponents_1.createUserVerify({ prisma, code: "", userId: newUser.id, status: true });
        await prisma.user.update({
            where: { email },
            data: {
                verifyId: verify.id?.toString(),
                consumersId: "",
                creditBalance: 2500,
                type: "new_user_parliament"
            }
        });
        return newUser;
    }
    static async createNewUser({ prisma, email, password, phone, name }) {
        let newPwd = await common_components_1.CommonComponents.hashedPassword(password);
        let code = common_components_1.CommonComponents.randCode();
        await config_1.ConfigService.sendEmail({
            from: `"iApp AI API" <${setting_1.SettingService.MAIL_FROM || "info@iapp.co.th"}>`,
            to: email,
            subject: `iApp-Thank you for your registration`,
            html: email_components_1.EmailComponents.formatVerifyEmail({
                title: "Thank You For Your Registration",
                description: `Confirm Your Registration ${setting_1.SettingService.APP_NAME}. Please click the link below to confirm registration`,
                subTitle: "",
                uri: `${setting_1.SettingService.FRONT_END_URL}/confirm/${code}?to=${email}`,
                buttonText: "Confirm",
                endCredit: true,
            }),
        });
        let userData = {
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
        };
        let newUser = await prisma.user.create({
            data: userData
        });
        let verify = await UserComponents_1.createUserVerify({ prisma, code: code, userId: newUser.id, status: false });
        await prisma.user.update({
            where: { id: newUser.id },
            data: { verifyId: verify.id?.toString() }
        });
        return newUser;
    }
    static async sendVerifyEmail({ prisma, email }) {
        let user = await UserComponents_1.findUser(prisma, { email });
        if (!user)
            throw new common_components_2.CustomError("User not found", 400);
        if (email && user.verifyId) {
            let code = common_components_1.CommonComponents.randCode();
            await config_1.ConfigService.sendEmail({
                from: `"iApp AI API" <${setting_1.SettingService.MAIL_FROM || "info@iapp.co.th"}>`,
                to: email,
                subject: `iApp-Thank you for your registration`,
                html: email_components_1.EmailComponents.formatVerifyEmail({
                    title: "Thank You For Your Registration",
                    description: `Confirm Your Registration ${setting_1.SettingService.APP_NAME}. Please click the link below to confirm registration`,
                    subTitle: "",
                    uri: `${setting_1.SettingService.FRONT_END_URL}/confirm/${code}?to=${email}`,
                    buttonText: "Confirm",
                    endCredit: true,
                }),
            });
        }
        return user;
    }
    static async createUserVerify({ prisma, code = "", userId, status = false }) {
        return await prisma.userVerify.create({
            data: {
                code: code,
                status: status,
                user: { connect: { id: userId } }
            }
        });
    }
    static async updateUserVerify({ prisma, userId, code }) {
        const userVerifyRecord = await prisma.userVerify.findFirst({
            where: { status: false, userId, code: code },
        });
        if (!userVerifyRecord) {
            throw new common_components_2.CustomError("User verification record not found", 404);
        }
        const updatedRecord = await prisma.userVerify.update({
            where: { id: userVerifyRecord.id },
            data: { status: true, code: '' },
        });
        if (!updatedRecord) {
            throw new common_components_2.CustomError("User verification update failed", 500);
        }
        return updatedRecord;
    }
};
exports.UserComponents = UserComponents;
exports.UserComponents = UserComponents = UserComponents_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserComponents);
//# sourceMappingURL=user.components.js.map