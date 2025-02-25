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
exports.ServiceComponents = void 0;
const common_1 = require("@nestjs/common");
let ServiceComponents = class ServiceComponents {
    constructor() { }
    static genServiceQuery(args) {
        let where = {};
        if (args.query && args.query?.toString().length > 0) {
            where = {
                ...args.where,
                OR: [
                    { name: { contains: args.query, mode: "insensitive" } },
                    { description: { contains: args.query, mode: "insensitive" } },
                ],
            };
        }
        return where;
    }
    static async findService(prisma, where) {
        return await prisma.service.findFirst({ where });
    }
};
exports.ServiceComponents = ServiceComponents;
exports.ServiceComponents = ServiceComponents = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ServiceComponents);
//# sourceMappingURL=service.components.js.map