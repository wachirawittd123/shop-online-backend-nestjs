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
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const common_components_1 = require("../service/common.components");
const service_1 = require("../service");
let PricingController = class PricingController {
    pricingService;
    constructor(pricingService) {
        this.pricingService = pricingService;
    }
    async pricings(args, authToken) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.pricingService.getPricings(args);
            return { message: "Query services success", data: result, status_code: 200 };
        }
        catch (error) {
            return { message: error?.message, status_code: error?.statusCode || 400 };
        }
    }
    async pricing(id, authToken) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.pricingService.getPricing({ id });
            return { message: "Query service success", data: result, status_code: 200 };
        }
        catch (error) {
            return { message: error?.message, status_code: error?.statusCode || 400 };
        }
    }
    async createPricing(args, authToken) {
        try {
            const user = await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin"] });
            const result = await this.pricingService.createPricing(args, user);
            return { message: "Create pricing success", data: result, status_code: 200 };
        }
        catch (error) {
            return { message: error?.message, status_code: error?.statusCode || 400 };
        }
    }
    async updatePricing(id, args, authToken) {
        try {
            const user = await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin"] });
            const result = await this.pricingService.updatePricing({ ...args, id: id }, user);
            return { message: "Update pricing success", data: result, status_code: 200 };
        }
        catch (error) {
            return { message: error?.message, status_code: error?.statusCode || 400 };
        }
    }
    async deletePricing(id, authToken) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin"] });
            const result = await this.pricingService.deletePricing({ id });
            return { message: "Delete pricing success", data: result, status_code: 200 };
        }
        catch (error) {
            return { message: error?.message, status_code: error?.statusCode || 400 };
        }
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "pricings", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "pricing", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "createPricing", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "updatePricing", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "deletePricing", null);
exports.PricingController = PricingController = __decorate([
    (0, common_1.Controller)('pricing'),
    __metadata("design:paramtypes", [service_1.PricingService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map