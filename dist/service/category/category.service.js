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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const category_components_1 = require("./category.components");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCategories(args) {
        const where = category_components_1.CategoryComponents.genCategoryQuery(args);
        return await this.prisma.category.findMany({ where });
    }
    async getCategory(args) {
        return await category_components_1.CategoryComponents.findCategory(this.prisma, args);
    }
    async createCategory(args, user) {
        const categoryName = await category_components_1.CategoryComponents.findCategory(this.prisma, { categoriesName: args.categoriesName });
        if (categoryName)
            throw new Error("Category name already exists");
        return await this.prisma.category.create({ data: { ...args, createdBy: user.id, updatedBy: user.id } });
    }
    async updateCategory(args, user) {
        const category = await this.getCategory({ id: args.id });
        if (!category)
            throw new Error("Category not found");
        const categoryName = await category_components_1.CategoryComponents.findCategory(this.prisma, { categoriesName: args.categoriesName, id: { not: args.id } });
        if (categoryName)
            throw new Error("Category name already exists");
        return await this.prisma.category.update({ where: { id: args.id }, data: { ...args, updatedBy: user.id } });
    }
    async deleteCategory(args) {
        const category = await this.getCategory({ id: args.id });
        if (!category)
            throw new Error("Category not found");
        return await this.prisma.category.delete({ where: { id: args.id } });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map