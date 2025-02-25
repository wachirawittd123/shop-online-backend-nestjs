"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserField = void 0;
const common_1 = require("@nestjs/common");
let UserField = class UserField {
    static selectFieldGetProfile() {
        return {
            id: true,
            email: true,
            name: true,
            picture: true,
            phone: true,
            role: true,
            creditBalance: true,
            consumersId: true,
            createdOn: true,
            updatedOn: true,
            status: true,
            profileImage: true,
            creditNotification: true,
            notification: true,
            allNotification: true,
            subscription: true,
            provider: true,
            type: true,
        };
    }
};
exports.UserField = UserField;
exports.UserField = UserField = __decorate([
    (0, common_1.Injectable)()
], UserField);
//# sourceMappingURL=user.field.js.map