"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.CommonComponents = void 0;
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const setting_1 = require("../common/setting");
const moment = require("moment");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let CommonComponents = class CommonComponents {
    static randCode() {
        return crypto.randomBytes(48).toString("hex");
    }
    static async hashedPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return { newPassword: hashedPassword, salt: salt };
    }
    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static async verifyJWT({ token, roles = ["consumer"] }) {
        let newToken = String(token).replaceAll("Bearer ", "");
        if (!newToken)
            throw new CustomError("Token is required", 400);
        const profile = jwt.verify(newToken, setting_1.SettingService.JWT_SECRET);
        if (!profile)
            throw new CustomError("Invalid token", 400);
        let user = await prisma.user.findFirst({ where: { id: profile.id } });
        if (!user)
            throw new CustomError("User not found", 400);
        if (user.token !== newToken)
            throw new CustomError("Token is expired", 400);
        if (roles && !roles.includes(user.role))
            throw new CustomError("You are not authorized to access this resource", 400);
        return profile;
    }
    static async signToken(data, remember) {
        const expiresIn = remember ? '7d' : '3d';
        let token = jwt.sign(data, setting_1.SettingService.JWT_SECRET, { expiresIn });
        await prisma.user.update({ where: { id: data.id }, data: { token: token } });
        return token;
    }
    static async refreshToken(data) {
        try {
            const lastUpdated = moment(data.updatedOn || data.createdOn);
            const currentTime = moment();
            let referenceTime = lastUpdated;
            if (lastUpdated.isValid()) {
                const daysElapsed = currentTime.diff(lastUpdated, 'days');
                if (daysElapsed > setting_1.SettingService.RTOKEN_EXPIRE) {
                    referenceTime = currentTime;
                }
            }
            const tokenData = `${data.id} ${data.password} ${referenceTime.format("YYYY-MM-DD HH:mm:ss")}`;
            const refreshToken = crypto
                .pbkdf2Sync(tokenData, setting_1.SettingService.JWT_SECRET, 10000, 100, "sha1")
                .toString("base64");
            if (data.rtoken !== refreshToken) {
                await prisma.user.update({
                    where: { id: data.id },
                    data: { rtoken: refreshToken }
                });
            }
            return refreshToken;
        }
        catch (error) {
            console.error("Error generating refresh token:", error);
            throw new CustomError("Failed to generate refresh token", 400);
        }
    }
    static async throwErrorResponse(error, res) {
        let statusCode = error?.statusCode || 400;
        return res.status(statusCode).json({ message: error?.message, status_code: statusCode });
    }
    static async throwResponse(data, message, res) {
        return res.status(200).json({ message: message, data: data, status_code: 200 });
    }
};
exports.CommonComponents = CommonComponents;
exports.CommonComponents = CommonComponents = __decorate([
    (0, common_1.Injectable)()
], CommonComponents);
class CustomError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=common.components.js.map