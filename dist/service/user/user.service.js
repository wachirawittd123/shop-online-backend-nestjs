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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const user_components_1 = require("./user.components");
const common_components_1 = require("../common.components");
const config_1 = require("../../common/config");
const setting_1 = require("../../common/setting");
const email_components_1 = require("../email.components");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(args) {
        const { skip = 0, limit = 10 } = args;
        const where = user_components_1.UserComponents.genUserQuery(args);
        const total = await this.prisma.user.count({ where });
        const totalPages = Math.ceil(total / limit);
        const users = await this.prisma.user.findMany({
            where,
            skip: Number(skip),
            take: Number(limit),
            include: {
                verify: true,
            },
        });
        return { data: users, totalPages, total };
    }
    async signup(data) {
        const { email, password = "", phone = "", name = "", method = "" } = data;
        if (!email)
            throw new common_components_1.CustomError("Email is required", 400);
        const lowerCaseEmail = email?.toLowerCase();
        let update = null;
        if (data.method === "open-parliament-hack2024-register") {
            const totalCount = await user_components_1.UserComponents.getParliamentUserCount(this.prisma);
            console.log("countLimitRegister ====> ", totalCount);
            if (totalCount <= 800) {
                const checkUser = await user_components_1.UserComponents.findUser(this.prisma, { email: lowerCaseEmail });
                if (checkUser) {
                    user_components_1.UserComponents.handleExistingUser({ prisma: this.prisma, checkUser, email: lowerCaseEmail });
                }
                else {
                    update = await user_components_1.UserComponents.createNewParliamentUser({ prisma: this.prisma, email: lowerCaseEmail, password, phone, name });
                }
            }
            else {
                throw new common_components_1.CustomError("Token ฟรี 2500 IC สำหรับทดลองใช้งาน มีผู้รับสิทธิ์เต็มจำนวนแล้ว, สอบถามเพิ่มเติมได้ที่ info@iapp.co.th", 400);
            }
        }
        else {
            update = await user_components_1.UserComponents.createNewUser({ prisma: this.prisma, email: lowerCaseEmail, password, phone, name });
        }
        return update;
    }
    async sendVerifyEmail(data) {
        return await user_components_1.UserComponents.sendVerifyEmail({ prisma: this.prisma, email: data.email });
    }
    async verifyEmail(data) {
        return await user_components_1.UserComponents.updateUserVerify({ prisma: this.prisma, code: data.code, userId: data.userId });
    }
    async forgetPwd(data) {
        const user = await user_components_1.UserComponents.findUser(this.prisma, { email: data.email });
        if (!user)
            throw new common_components_1.CustomError("User not found", 400);
        if (user && user.provider !== "local")
            throw new common_components_1.CustomError(`E-mail ${data.email} สมัครด้วย ${user.provider}`, 400);
        let code = common_components_1.CommonComponents.randCode();
        await config_1.ConfigService.sendEmail({
            from: `iApp-Forgot Password <${setting_1.SettingService.MAIL_FROM || "info@iapp.co.th"}>`,
            to: data.email,
            subject: `Reset Password`,
            text: `${setting_1.SettingService.APP_NAME} - Forgot Password`,
            html: email_components_1.EmailComponents.formatVerifyEmail({
                title: "Forgot Password",
                description: ``,
                subTitle: "Click the button for reset your password",
                uri: `${setting_1.SettingService.FRONT_END_URL}/reset/${code}`,
                buttonText: "Reset Password",
            }),
        });
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: { ftoken: code },
        });
        return updatedUser;
    }
    async resetPwd(data) {
        const { ftoken, password } = data;
        const user = await user_components_1.UserComponents.findUser(this.prisma, { ftoken: ftoken });
        if (!user) {
            throw new common_components_1.CustomError("เกิดข้อผิดพลาด กรุณาทำขั้นตอนการลืมรหัสผ่านใหม่อีกครั้ง", 400);
        }
        if (user && user.provider !== "local") {
            throw new common_components_1.CustomError(`E-mail ${user.email} สมัครด้วย ${user.provider}`, 400);
        }
        let newPwd = await common_components_1.CommonComponents.hashedPassword(password);
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: { password: newPwd.newPassword, salt: newPwd.salt, ftoken: "" },
        });
        return updatedUser;
    }
    async changePwd(data, user) {
        const { oldPassword, newPassword } = data;
        let updateData = {};
        const findUser = await user_components_1.UserComponents.findUser(this.prisma, { id: user.id });
        if (!findUser)
            throw new common_components_1.CustomError("User not found", 400);
        if (newPassword && !oldPassword)
            throw new common_components_1.CustomError("Please provide your old password", 400);
        if (!newPassword && oldPassword)
            throw new common_components_1.CustomError("Please provide a new password", 400);
        const hashedPwd = await common_components_1.CommonComponents.hashedPassword(newPassword);
        updateData = { password: hashedPwd?.newPassword, salt: hashedPwd?.newPassword };
        if (newPassword && oldPassword && oldPassword !== "create") {
            const authenticated = await bcrypt.compare(newPassword, findUser?.password);
            const oldAuthenticated = await bcrypt.compare(oldPassword, findUser?.password);
            if (authenticated) {
                throw new common_components_1.CustomError("New password cannot be the same as the old password", 400);
            }
            else if (!oldAuthenticated) {
                throw new common_components_1.CustomError("Old password is incorrect", 400);
            }
        }
        else if (newPassword && oldPassword === "create") {
            updateData = { ...updateData, provider: "local" };
            await this.prisma.userVerify.update({
                where: { userId: user?.id },
                data: { status: true, code: "" }
            });
        }
        return await this.prisma.user.update({ where: { id: user?.id }, data: updateData });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map