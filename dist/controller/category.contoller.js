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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../service");
const common_components_1 = require("../service/common.components");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async categories(args, authToken, res) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.categoryService.getCategories(args);
            return common_components_1.CommonComponents.throwResponse(result, "Query categories success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async categorie(id, authToken, res) {
        try {
            await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.categoryService.getCategory({ id });
            return common_components_1.CommonComponents.throwResponse(result, "Query category success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async createCategory(args, authToken, res) {
        try {
            const user = await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.categoryService.createCategory(args, user);
            return common_components_1.CommonComponents.throwResponse(result, "Create category success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
    async updateCategory(id, args, authToken, res) {
        try {
            const user = await common_components_1.CommonComponents.verifyJWT({ token: authToken, roles: ["superadmin", "admin", "consumer"] });
            const result = await this.categoryService.updateCategory({ ...args, id: id }, user);
            return common_components_1.CommonComponents.throwResponse(result, "Update category success", res);
        }
        catch (error) {
            return common_components_1.CommonComponents.throwErrorResponse(error, res);
        }
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "categories", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "categorie", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.contoller.js.map