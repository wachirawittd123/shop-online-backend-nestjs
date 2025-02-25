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
exports.ServiceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const service_components_1 = require("./service.components");
const category_components_1 = require("../category/category.components");
let ServiceCategoryService = class ServiceCategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getServices(args) {
        const where = service_components_1.ServiceComponents.genServiceQuery(args);
        return await this.prisma.service.findMany({ where });
    }
    async getService(args) {
        return await service_components_1.ServiceComponents.findService(this.prisma, args);
    }
    async createService(args, user) {
        const category = await category_components_1.CategoryComponents.findCategory(this.prisma, { id: args.apiCategoriesId });
        if (!category)
            throw new Error("Category not found");
        return await this.prisma.service.create({ data: { ...args, createdBy: user.id, updatedBy: user.id } });
    }
    async updateService(args, user) {
        const service = await this.getService({ id: args.id });
        if (!service)
            throw new Error("Service not found");
        const category = await category_components_1.CategoryComponents.findCategory(this.prisma, { id: args.apiCategoriesId });
        if (!category)
            throw new Error("Category not found");
        return await this.prisma.service.update({ where: { id: args.id }, data: { ...args, updatedBy: user.id } });
    }
    async deleteService(args) {
        const service = await this.getService({ id: args.id });
        if (!service)
            throw new Error("Service not found");
        return await this.prisma.service.delete({ where: { id: args.id } });
    }
};
exports.ServiceCategoryService = ServiceCategoryService;
exports.ServiceCategoryService = ServiceCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceCategoryService);
//# sourceMappingURL=service.service.js.map