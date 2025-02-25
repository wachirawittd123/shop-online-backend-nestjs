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
exports.ServiceCategoryController = void 0;
const common_1 = require("@nestjs/common");
const common_components_1 = require("../service/common.components");
const service_1 = require("../service");
let ServiceCategoryController = class ServiceCategoryController {
    serviceCategoryService;
    constructor(serviceCategoryService) {
        this.serviceCategoryService = serviceCategoryService;
    }
    async services(args, authToken, res) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.serviceCategoryService.getServices(args);
            return common_components_1.CommonComponents.throwResponse(result, "Query services success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async service(id, authToken, res) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.serviceCategoryService.getService({ id });
            return common_components_1.CommonComponents.throwResponse(result, "Query service success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async createService(args, authToken, res) {
        try {
            const user = await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin"] });
            const result = await this.serviceCategoryService.createService(args, user);
            return common_components_1.CommonComponents.throwResponse(result, "Create service success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async updateService(id, args, authToken, res) {
        try {
            const user = await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin"] });
            const result = await this.serviceCategoryService.updateService({ ...args, id: id }, user);
            return common_components_1.CommonComponents.throwResponse(result, "Update service success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async deleteService(id, authToken, res) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin"] });
            const result = await this.serviceCategoryService.deleteService({ id });
            return common_components_1.CommonComponents.throwResponse(result, "Delete service success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
};
exports.ServiceCategoryController = ServiceCategoryController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "services", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "service", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "createService", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "deleteService", null);
exports.ServiceCategoryController = ServiceCategoryController = __decorate([
    (0, common_1.Controller)('service'),
    __metadata("design:paramtypes", [service_1.ServiceCategoryService])
], ServiceCategoryController);
//# sourceMappingURL=service.controller.js.map