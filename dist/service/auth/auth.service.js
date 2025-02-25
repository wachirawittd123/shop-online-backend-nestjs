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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const user_components_1 = require("../user/user.components");
const prisma_service_1 = require("../../common/prisma.service");
const common_components_1 = require("../common.components");
let AuthService = class AuthService {
    jwtService;
    userService;
    prisma;
    constructor(jwtService, userService, prisma) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.prisma = prisma;
    }
    async validateUser(email, password) {
        const user = await user_components_1.UserComponents.findUser(this.prisma, { email: email });
        if (!user)
            return null;
        return user;
    }
    async login(user) {
        const profile = await user_components_1.UserComponents.getProfile(this.prisma, { email: user.email });
        let token = await common_components_1.CommonComponents.signToken(profile);
        let rtoken = await common_components_1.CommonComponents.refreshToken({ ...profile, password: user.password });
        return {
            ...profile,
            token: token,
            rtoken: rtoken,
        };
    }
    async logout(user) {
        return await this.prisma.user.update({ where: { id: user.id }, data: { token: null, rtoken: null } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, user_service_1.UserService, prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map