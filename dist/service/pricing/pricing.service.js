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
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const pricing_components_1 = require("./pricing.components");
const common_components_1 = require("../common.components");
let PricingService = class PricingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPricings(args) {
        const where = pricing_components_1.PricingComponents.genPricingQuery(args);
        return await this.prisma.pricing.findMany({ where, include: { createdByUser: true, updatedByUser: true } });
    }
    async getPricing(args) {
        return await pricing_components_1.PricingComponents.findPricing(this.prisma, args);
    }
    async createPricing(args, user) {
        return await this.prisma.pricing.create({ data: { ...args, createdBy: user.id, updatedBy: user.id } });
    }
    async updatePricing(args, user) {
        const pricing = await pricing_components_1.PricingComponents.findPricing(this.prisma, { id: args.id });
        if (!pricing)
            throw new common_components_1.CustomError("Pricing not found", 400);
        return await this.prisma.pricing.update({ where: { id: args.id }, data: { ...args, updatedBy: user.id } });
    }
    async deletePricing(args) {
        const pricing = await pricing_components_1.PricingComponents.findPricing(this.prisma, { id: args.id });
        if (!pricing)
            throw new common_components_1.CustomError("Pricing not found", 400);
        return await this.prisma.pricing.delete({ where: { id: args.id } });
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PricingService);
//# sourceMappingURL=pricing.service.js.map