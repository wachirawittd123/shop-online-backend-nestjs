import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../../common/prisma.service';
import { UserComponents } from '../user.components';
import { CommonComponents, CustomError } from '../../common.components';
import { ConfigService } from 'src/common/config';
import * as bcrypt from 'bcrypt';
describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              count: jest.fn().mockResolvedValue(1),
              findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'John Doe' }]),
              update: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: UserComponents,
          useValue: {
            findUser: jest.fn(),
          },
        },
        {
          provide: CommonComponents,
          useValue: {
            hashedPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getUsers', () => {
    it('should return paginated users', async () => {
      const args = { skip: 0, limit: 10 };
      const mockUsers = [{ id: 1, name: 'John Doe' }];
      (prismaService.user.count as jest.Mock).mockResolvedValue(1);
      (prismaService.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await service.getUsers(args);

      expect(result).toEqual({ data: mockUsers, total: 1, totalPages: 1 });
      expect(prismaService.user.count).toHaveBeenCalledWith({ where: expect.anything() });
      expect(prismaService.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
        skip: 0,
        take: 10,
      }));
    });
  });

  describe('signup', () => {
    it('should throw an error if email is not provided', async () => {
      await expect(service.signup({ email: '', password: '123456' }))
        .rejects
        .toThrow(new CustomError("Email is required", 400));
    });

    it('should create a new user if method is not "open-parliament-hack2024-register"', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      jest.spyOn(UserComponents, 'createNewUser').mockResolvedValue(mockUser);

      const result = await service.signup({ email: 'test@example.com', password: '123456' });

      expect(result).toEqual(mockUser);
      expect(UserComponents.createNewUser).toHaveBeenCalledWith(expect.objectContaining({
        email: 'test@example.com',
      }));
    });
  });
  describe('forgetPwd', () => {
    it('should throw an error if user is not found', async () => {
      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(null);
  
      await expect(service.forgetPwd({ email: 'nonexistent@example.com' }))
        .rejects
        .toThrow(new CustomError("User not found", 400));
    });
  
    it('should throw an error if user provider is not local', async () => {
      const mockUser = { id: 1, email: 'test@example.com', provider: 'google' };
      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockUser);
  
      await expect(service.forgetPwd({ email: 'test@example.com' }))
        .rejects
        .toThrow(new CustomError(`E-mail test@example.com สมัครด้วย google`, 400));
    });
  
    it('should send email and update user if user is found and provider is local', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        salt: 'someSalt',
        phone: '1234567890',
        name: 'Test User',
        picture: null,
        role: "consumer",
        status: 'active',
        provider: 'local',
        verifyId: 'verify-id',
        creditBalance: 2500,
        type: 'new_user_parliament',
        notification: true,
        allNotification: true,
        method: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        google: null,
        facebook: null,
        originCreditBalance: 0,
        creditPeriod: new Date(),
        consumersId: '',
        token: '',
        rtoken: '',
        ftoken: '',
        gtoken: '',
        pwExpiredOn: new Date(),
        createdBy: '',
        updatedBy: '',
        createdOn: new Date(),
        updatedOn: new Date(),
        taxName: '',
        taxNo: '',
        taxAddress: '',
        profileImage: '',
        faceCompanyName: '',
        faceCompanyPassword: '',
        profile: {},
        signtoken: '',
        credit: 0,
        subscription: false,
      };

      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockUser);
      jest.spyOn(CommonComponents, 'randCode').mockReturnValue('123456');
      jest.spyOn(ConfigService, 'sendEmail').mockResolvedValue(undefined);
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      const result = await service.forgetPwd({ email: 'test@example.com' });
      expect(result).toEqual(mockUser);
      expect(ConfigService.sendEmail).toHaveBeenCalledWith(expect.objectContaining({
        to: 'test@example.com',
        subject: 'Reset Password',
      }));
      expect(prismaService.user.update).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: mockUser.id },
        data: { ftoken: '123456' },
      }));
    });
  });
  
  it('should reset password successfully', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'oldPass',
      salt: 'someSalt',
      phone: '1234567890',
      name: 'Test User',
      picture: null,
      role: "consumer",
      status: 'active',
      provider: 'local',
      verifyId: 'verify-id',
      creditBalance: 2500,
      type: 'new_user_parliament',
      notification: true,
      allNotification: true,
      method: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      google: null,
      facebook: null,
      originCreditBalance: 0,
      creditPeriod: new Date(),
      consumersId: '',
      token: '',
      rtoken: '',
      ftoken: '',
      gtoken: '',
      pwExpiredOn: new Date(),
      createdBy: '',
      updatedBy: '',
      createdOn: new Date(),
      updatedOn: new Date(),
      taxName: '',
      taxNo: '',
      taxAddress: '',
      profileImage: '',
      faceCompanyName: '',
      faceCompanyPassword: '',
      profile: {},
      signtoken: '',
      credit: 0,
      subscription: false,
    };

    const mockNewPassword = { newPassword: 'hashedPassword', salt: 'salt' };

    jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockUser);
    jest.spyOn(CommonComponents, 'hashedPassword').mockResolvedValue(mockNewPassword);
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

    const result = await service.resetPwd({ ftoken: 'validToken', password: 'newPassword' });

    expect(result).toEqual(mockUser);
    expect(UserComponents.findUser).toHaveBeenCalledWith(prismaService, { ftoken: 'validToken' });
    expect(CommonComponents.hashedPassword).toHaveBeenCalledWith('newPassword');
    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      data: { password: mockNewPassword.newPassword, salt: mockNewPassword.salt, ftoken: '' },
    });
  });

  it('should throw error if user not found', async () => {
    jest.spyOn(UserComponents, 'findUser').mockResolvedValue(null);

    await expect(service.resetPwd({ ftoken: 'invalidToken', password: 'newPassword' }))
      .rejects
      .toThrow(new CustomError("เกิดข้อผิดพลาด กรุณาทำขั้นตอนการลืมรหัสผ่านใหม่อีกครั้ง", 400));
  });

  it('should throw error if user provider is not local', async () => {
    const mockUser = { id: 1, provider: 'google', email: 'test@example.com' };

    jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockUser);

    await expect(service.resetPwd({ ftoken: 'validToken', password: 'newPassword' }))
      .rejects
      .toThrow(new CustomError(`E-mail ${mockUser.email} สมัครด้วย ${mockUser.provider}`, 400));
  });
  describe('changePwd', () => {
    let mockProfile
    beforeEach(async () => {
      prismaService = new PrismaService();
      mockProfile = {
        id: '1',
        email: 'test@example.com',
        password: 'oldPass',
        salt: 'someSalt',
        phone: '1234567890',
        name: 'Test User',
        picture: null,
        role: "consumer",
        status: 'active',
        provider: 'local',
        verifyId: 'verify-id',
        creditBalance: 2500,
        type: 'new_user_parliament',
        notification: true,
        allNotification: true,
        method: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        google: null,
        facebook: null,
        originCreditBalance: 0,
        creditPeriod: new Date(),
        consumersId: '',
        token: '',
        rtoken: '',
        ftoken: '',
        gtoken: '',
        pwExpiredOn: new Date(),
        createdBy: '',
        updatedBy: '',
        createdOn: new Date(),
        updatedOn: new Date(),
        taxName: '',
        taxNo: '',
        taxAddress: '',
        profileImage: '',
        faceCompanyName: '',
        faceCompanyPassword: '',
        profile: {},
        signtoken: '',
        credit: 0,
        subscription: false,
      };
    });
    it('should throw an error if user is not found', async () => {
      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(null);
  
      await expect(service.changePwd({ oldPassword: 'oldPass', newPassword: 'newPass' }, mockProfile))
        .rejects
        .toThrow(new CustomError("User not found", 400));
    });
  
    it('should throw an error if old password is not provided', async () => {
      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockProfile);
  
      await expect(service.changePwd({ newPassword: 'newPass' }, mockProfile))
        .rejects
        .toThrow(new CustomError("Please provide your old password", 400));
    });
  
    it('should throw an error if new password is not provided', async () => {
      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockProfile);
  
      await expect(service.changePwd({ oldPassword: 'oldPass' }, mockProfile))
        .rejects
        .toThrow(new CustomError("Please provide a new password", 400));
    });
  
    it('should throw an error if new password is the same as the old password', async () => {
      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockProfile);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  
      await expect(service.changePwd({ oldPassword: 'oldPass', newPassword: 'oldPass' }, mockProfile))
        .rejects
        .toThrow(new CustomError("New password cannot be the same as the old password", 400));
    });
  
    it('should throw an error if old password is incorrect', async () => {
      jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockProfile);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false).mockResolvedValueOnce(false);
  
      await expect(service.changePwd({ oldPassword: 'wrongOldPass', newPassword: 'newPass' }, mockProfile))
        .rejects
        .toThrow(new CustomError("Old password is incorrect", 400));
    });
  });
});
