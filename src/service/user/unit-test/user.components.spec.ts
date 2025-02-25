import { Test, TestingModule } from '@nestjs/testing';
import { UserComponents } from '../user.components';
import { PrismaService } from '../../../common/prisma.service';
import { CommonComponents, CustomError } from '../../common.components';
import { ConfigService } from 'src/common/config';
import { SettingService } from 'src/common/setting';

// Mock the uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('UserComponents', () => {
  let prismaService: PrismaService;
  let prisma: PrismaService;
  let mockUserVerify;
  let mockUser;

  beforeEach(async () => {
    mockUser = {
        id: 'new-user-id',
        password: 'hashedPassword',
        salt: 'randomSalt',
        phone: '1234567890',
        name: 'Parliament User',
        role: "consumer",
        status: 'active',
        provider: 'local',
        verifyId: 'verify-id',
        creditBalance: 2500,
        type: 'new_user_parliament',
        allNotification: false,
        consumersId: null,
        createdAt: expect.any(Date),
        createdBy: '',
        createdOn: expect.any(Date),
        credit: 0,
        creditPeriod: null,
        faceCompanyName: '',
        faceCompanyPassword: '',
        facebook: null,
        ftoken: null,
        google: null,
        gtoken: null,
        method: null,
        notification: false,
        originCreditBalance: 0,
        picture: null,
        profile: {},
        profileImage: '',
        pwExpiredOn: expect.any(Date),
        rtoken: null,
        signtoken: '',
        subscription: false,
        taxAddress: '',
        taxName: '',
        taxNo: '',
        token: null,
        updatedBy: '',
        updatedOn: expect.any(Date),
    };
    
    mockUserVerify = {
        id: 'verify-id',
        status: false,
        code: '123456',
        userId: 'user-id',
    }

    prisma = {
        user: {
            update: jest.fn(),
            create: jest.fn(),
        },
        userVerify: {
            findFirst: jest.fn().mockResolvedValue(mockUserVerify), // Mock userVerify.findFirst
            update: jest.fn().mockResolvedValue({
                id: 'verify-id',
                status: true,
                code: '',
                userId: 'user-id'
            }), // Mock userVerify.update
            create: jest.fn(),
        },
    } as unknown as PrismaService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserComponents,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              groupBy: jest.fn(),
              count: jest.fn(),
            },
            userVerify: {
              create: jest.fn(),
              findFirst: jest.fn().mockResolvedValue(mockUserVerify),
              update: jest.fn().mockResolvedValue({
                id: 'verify-id',
                status: true,
                code: '',
                userId: 'user-id'
              }),
            },
          },
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });
  

  describe('findUser', () => {
    it('should return a user if found', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

      const result = await UserComponents.findUser(prismaService, { email: 'test@example.com' });
      expect(result).toEqual(mockUser);
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

      const result = await UserComponents.findUser(prismaService, { email: 'notfound@example.com' });
      expect(result).toBeNull();
    });
  });

  describe('getParliamentUserCount', () => {
    it('should return the correct count of parliament users', async () => {
      const mockCounts = [
        {
          type: 'new_user_parliament',
          _count: { type: 2 },
          _avg: { creditBalance: null, originCreditBalance: null },
          _max: { creditBalance: null, originCreditBalance: null },
          _min: { creditBalance: null, originCreditBalance: null },
          _sum: { creditBalance: null, originCreditBalance: null },
          id: 'user-id',
          email: 'test@example.com',
          password: 'password123',
          phone: '1234567890',
          name: 'Test User',
          picture: null,
          role: "consumer",
          verifyId: null,
          notification: true,
          allNotification: true,
          provider: 'local',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedOn: new Date(),
          method: '',
          google: null,
          facebook: null,
          creditBalance: 0,
          originCreditBalance: 0,
          creditPeriod: new Date(),
          consumersId: '',
          salt: '',
          token: '',
          rtoken: '',
          ftoken: '',
          gtoken: '',
          pwExpiredOn: new Date(),
          createdBy: '',
          updatedBy: '',
          createdOn: new Date(),
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
        },
        {
          type: 'old_user_parliament',
          _count: { type: 3 },
          _avg: { creditBalance: null, originCreditBalance: null },
          _max: { creditBalance: null, originCreditBalance: null },
          _min: { creditBalance: null, originCreditBalance: null },
          _sum: { creditBalance: null, originCreditBalance: null },
          id: 'user-id-2',
          email: 'test2@example.com',
          password: 'password123',
          phone: '0987654321',
          name: 'Test User 2',
          picture: null,
          role: "consumer",
          verifyId: null,
          notification: true,
          allNotification: true,
          provider: 'local',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedOn: new Date(),
          method: '',
          google: null,
          facebook: null,
          creditBalance: 0,
          originCreditBalance: 0,
          creditPeriod: new Date(),
          consumersId: '',
          salt: '',
          token: '',
          rtoken: '',
          ftoken: '',
          gtoken: '',
          pwExpiredOn: new Date(),
          createdBy: '',
          updatedBy: '',
          createdOn: new Date(),
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
        },
      ];
      jest.spyOn(prismaService.user, 'groupBy').mockResolvedValue(mockCounts);

      const result = await UserComponents.getParliamentUserCount(prismaService);
      expect(result).toBe(5);
    });

    // it('should throw a CustomError if an error occurs', async () => {
    //   jest.spyOn(prismaService.user, 'groupBy').mockRejectedValue(new Error('Database error'));

    //   await expect(UserComponents.getParliamentUserCount(prismaService)).rejects.toThrow(CustomError);
    // });

    // it('should handle database errors gracefully', async () => {
    //   jest.spyOn(prismaService.user, 'count').mockRejectedValue(new Error('Database error'));

    //   await expect(UserComponents.getParliamentUserCount(prismaService)).rejects.toThrow(new CustomError("Failed to fetch parliament user count", 400));
    // });
  });

  describe('handleExistingUser', () => {
        it('should throw an error if user type includes "user_parliament"', async () => {
            const checkUser = { type: "user_parliament" };
            const email = "test@example.com";

            await expect(UserComponents.handleExistingUser({ prisma, checkUser, email }))
                .rejects
                .toThrow(new CustomError("คุณลงทะเบียนรับสิทธิ์แล้ว ไม่สามารถรับฟรี Token ได้อีก", 400));
        });

        it('should update user and throw "Account already exists" error for non-parliament users', async () => {
            const checkUser = { type: "regular_user", creditBalance: 1000, id: "user-id" };
            const email = "test@example.com";

            await expect(UserComponents.handleExistingUser({ prisma, checkUser, email }))
                .rejects
                .toThrow(new CustomError("Account already exists", 400));

            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { email },
                data: {
                    originCreditBalance: checkUser.creditBalance,
                    creditBalance: { increment: 2500 },
                    type: "old_user_parliament"
                }
            });

            expect(prisma.userVerify.findFirst).toHaveBeenCalledWith({
                where: { status: false, userId: checkUser.id }
            });

            expect(prisma.userVerify.update).toHaveBeenCalledWith({
                where: { id: "verify-id" },
                data: { status: true, code: "" }
            });
        });
    });

    
    describe('createNewUser', () => {
        it('should create a new user and send a verification email', async () => {
      
          
      
          jest.spyOn(CommonComponents, 'hashedPassword').mockResolvedValue({
            newPassword: 'hashedPassword',
            salt: 'randomSalt',
          });
      
          jest.spyOn(ConfigService, 'sendEmail').mockResolvedValue(undefined);
      
          jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);
          jest.spyOn(UserComponents, 'createUserVerify').mockResolvedValue(mockUserVerify);
          jest.spyOn(prismaService.user, 'update').mockResolvedValue({
            ...mockUser,
          });
      
          const result = await UserComponents.createNewUser({
            prisma: prismaService,
            email: 'newuser@example.com',
            password: 'password123',
            phone: '1234567890',
            name: 'New User',
          });
      
          expect(CommonComponents.hashedPassword).toHaveBeenCalledWith('password123');
          expect(ConfigService.sendEmail).toHaveBeenCalledWith({
            from: `"iApp AI API" <${SettingService.MAIL_FROM || "info@iapp.co.th"}>`,
            to: 'newuser@example.com',
            subject: 'iApp-Thank you for your registration',
            html: expect.any(String),
          });
          expect(prismaService.user.create).toHaveBeenCalledWith({
            data: {
              email: 'newuser@example.com',
                password: 'hashedPassword',
                salt: 'randomSalt',
                phone: '1234567890',
                name: 'New User',
                creditBalance: 100,
                notification: true,
                allNotification: true,
                status: 'active',
                provider: 'local',
                type: 'new_user',
            },
          });
          expect(UserComponents.createUserVerify).toHaveBeenCalledWith({
            prisma: prismaService,
            code: expect.any(String),
            userId: 'new-user-id',
            status: false,
          });
          expect(prismaService.user.update).toHaveBeenCalledWith({
            where: { id: 'new-user-id' },
            data: { verifyId: 'verify-id' },
          });
          expect(result).toEqual(expect.objectContaining(mockUser));
        });
      
        // Add more tests for error handling if needed
      });
      describe('sendVerifyEmail', () => {
        it('should update user verification and return the user if found', async () => {
            const mockUser = {
                id: 'user-id',
                email: 'test@example.com',
                verifyId: 'verify-id',
            };
    
            jest.spyOn(UserComponents, 'findUser').mockResolvedValue(mockUser);
            jest.spyOn(UserComponents, 'updateUserVerify').mockResolvedValue(undefined);
    
            const result = await UserComponents.sendVerifyEmail({
                prisma: prismaService,
                email: 'test@example.com',
            });
    
            expect(UserComponents.findUser).toHaveBeenCalledWith(prismaService, { email: 'test@example.com' });
            
            expect(result).toEqual(mockUser);
        });
    
        it('should throw a CustomError if user is not found', async () => {
            jest.spyOn(UserComponents, 'findUser').mockResolvedValue(null);
    
            await expect(UserComponents.sendVerifyEmail({
                prisma: prismaService,
                email: 'notfound@example.com',
            })).rejects.toThrow(new CustomError("User not found", 400));
        });
    });

    describe('createUserVerify', () => {
        it('should create a user verification record', async () => {
            
            // Ensure the mock is set up correctly
            jest.spyOn(prismaService.userVerify, 'create').mockResolvedValue(mockUserVerify);
    
            // Call the function
            const result = await UserComponents.createUserVerify({
                prisma: prismaService,
                code: '123456',
                userId: 'user-id',
                status: false,
            });

            // Verify the result
            expect(result).toEqual(mockUserVerify);
        });
    });
    
  // Add more tests for other methods as needed
}); 