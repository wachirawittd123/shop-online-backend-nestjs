"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCommonUnitTest = void 0;
const common_1 = require("@nestjs/common");
let MockCommonUnitTest = class MockCommonUnitTest {
    static MockUnitUserProfile() {
        return {
            id: '1',
            email: 'test@example.com',
            phone: '1234567890',
            name: 'Test User',
            creditNotification: true,
            picture: null,
            role: "consumer",
            status: 'active',
            provider: 'local',
            creditBalance: 2500,
            type: 'new_user_parliament',
            notification: true,
            allNotification: true,
            consumersId: '',
            createdOn: new Date(),
            updatedOn: new Date(),
            profileImage: '',
            subscription: false,
        };
    }
};
exports.MockCommonUnitTest = MockCommonUnitTest;
exports.MockCommonUnitTest = MockCommonUnitTest = __decorate([
    (0, common_1.Injectable)()
], MockCommonUnitTest);
//# sourceMappingURL=common.js.map