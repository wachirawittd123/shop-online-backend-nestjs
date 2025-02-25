"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const prisma_module_1 = require("./common/prisma.module");
const service_1 = require("./service");
const auth_module_1 = require("./auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [controller_1.UserController, controller_1.AuthController, controller_1.CategoryController, controller_1.ServiceCategoryController, controller_1.PricingController],
        providers: [service_1.UserService, service_1.AuthService, service_1.CategoryService, service_1.ServiceCategoryService, service_1.PricingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map