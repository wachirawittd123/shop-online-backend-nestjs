import { PrismaService } from "src/common/prisma.service";

export interface IUser {
    id: string
    email: string
    password: string
    phone: string
    name: string
    picture: string
    role: string
    verify: IUserVerify
    creditNotification?: IUserCreditNotification
    notification: boolean
    allNotification: boolean
    method?: string
    status: string
    google: any // Use a more specific type if possible
    facebook: any // Use a more specific type if possible
    provider: string
    creditBalance: number
    creditPeriod: Date
    consumersId: string
    salt: string
    token: string
    rtoken: string
    ftoken: string
    gtoken: string
    pwExpiredOn: Date
    createdBy: string
    updatedBy: string
    createdOn: Date
    updatedOn: Date
    taxName: string
    taxNo: string
    taxAddress: string
    profileImage: string
    faceCompanyName: string
    faceCompanyPassword: string
    profile: any // Use a more specific type if possible
    signtoken: any // Use a more specific type if possible
    credit: any // Use a more specific type if possible
    subscription: boolean
    type: string
    originCreditBalance: number
    createdAt: Date
}

export interface IUserVerify {
    id: string
    status: boolean
    code: string
    user?: IUser
}

export interface IUserCreditNotification {
    id: string
    credit: number
    lastSent: Date
    user: IUser
}

export interface ISignup {
    email: string
    password?: string
    phone?: string
    name?: string
    method?: string
}

export interface ICreateNewParliamentUser {
    prisma: PrismaService
    email: string
    password: string
    phone: string
    name: string
}

export interface IHandleExistingUser {
    prisma: PrismaService
    checkUser: any
    email: string
}

export interface ICreateNewUser {
    prisma: PrismaService
    email: string
    password: string
    phone: string
    name: string
}

export interface ISendVerifyEmail {
    prisma?: PrismaService
    email: string
}

export interface IVerifyEmail {
    prisma: PrismaService
    code: string
}

export interface ICreateUserVerify {
    prisma: PrismaService
    code?: string
    userId: string
    status?: boolean
}

export interface IUpdateUserVerify {
    prisma: PrismaService
    userId?: string
    code?: string
}

export interface IResetPwd {
    ftoken: string
    password: string
}

export interface IPwd {
    oldPassword?: string
    newPassword?: string
}


export interface IUserProfile {
    id: string;
    email: string;
    name: string;
    picture: string | null;
    phone: string;
    role: string;
    creditBalance: number;
    consumersId: string | null;
    createdOn: Date;
    updatedOn: Date;
    status: string;
    profileImage: string | null;
    creditNotification: any | null; // Use a more specific type if possible
    notification: boolean;
    allNotification: boolean;
    subscription: boolean;
    provider: string;
    type: string;
}