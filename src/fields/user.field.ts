import { Injectable } from '@nestjs/common';

@Injectable()
export class UserField {
    static selectFieldGetProfile(): any {
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
        }
    }
}