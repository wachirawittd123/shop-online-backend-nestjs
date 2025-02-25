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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user/user.service");
const common_components_1 = require("../service/common.components");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(args, authToken, res) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin"] });
            const result = await this.userService.getUsers(args);
            return common_components_1.CommonComponents.throwResponse(result, "Get users success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async signup(data, res) {
        try {
            const result = await this.userService.signup(data);
            return common_components_1.CommonComponents.throwResponse(result, "create user success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async sendVerifyEmail(data, res) {
        try {
            const result = await this.userService.sendVerifyEmail(data);
            return common_components_1.CommonComponents.throwResponse(result, "send verify email success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async verifyEmail(data, res) {
        try {
            const result = await this.userService.verifyEmail(data);
            return common_components_1.CommonComponents.throwResponse(result, "update verify email success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async forgetPwd(data, res) {
        try {
            const result = await this.userService.forgetPwd(data);
            return common_components_1.CommonComponents.throwResponse(result, "update verify email success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async resetPwd(data, res) {
        try {
            const result = await this.userService.resetPwd(data);
            return common_components_1.CommonComponents.throwResponse(result, "update verify email success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async changePwd(data, authToken, res) {
        try {
            const user = await common_components_1.CommonComponents.verifyJWT({ token: authToken });
            const result = await this.userService.changePwd(data, user);
            return common_components_1.CommonComponents.throwResponse(result, "update verify email success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Put)('/send-verify-email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendVerifyEmail", null);
__decorate([
    (0, common_1.Put)('/verify-email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Put)('/forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgetPwd", null);
__decorate([
    (0, common_1.Put)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPwd", null);
__decorate([
    (0, common_1.Put)('/change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePwd", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map