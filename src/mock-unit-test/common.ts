import { Injectable } from "@nestjs/common"
import { IUserProfile } from "src/interface"

@Injectable()
export class MockCommonUnitTest {
    static MockUnitUserProfile(): IUserProfile {
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
        }
    }
}