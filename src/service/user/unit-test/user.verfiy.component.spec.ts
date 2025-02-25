import { UserComponents } from '../user.components';
import { PrismaService } from '../../../common/prisma.service';
import { CustomError } from 'src/service/common.components';

// Mock the uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('UserVerifyComponents', () => {
  let prismaService: PrismaService;
  let mockUserVerify;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUserVerify = {
        id: 'verify-id',
        status: false,
        code: '123456',
        userId: 'user-id',
    };

    prismaService = new PrismaService();

    jest.spyOn(prismaService.userVerify, 'create').mockResolvedValue(mockUserVerify);
    // Mock methods
    jest.spyOn(prismaService.userVerify, 'findFirst').mockResolvedValue(mockUserVerify);

    jest.spyOn(prismaService.userVerify, 'update').mockResolvedValue({...mockUserVerify, status: true, code: ''});
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

  it('should successfully update the user verification status', async () => {
    await UserComponents.updateUserVerify({
        prisma: prismaService,
        code: '123456',
        userId: 'user-id',
    });
    expect(prismaService.userVerify.findFirst).toHaveBeenCalled();
    expect(prismaService.userVerify.update).toHaveBeenCalled();
  });

  describe('updateUserVerify', () => {
    it('should successfully update the user verification status', async () => {
      const result = await UserComponents.updateUserVerify({
          prisma: prismaService,
          code: '123456',
          userId: 'user-id',
      });
      expect(prismaService.userVerify.findFirst).toHaveBeenCalled();
      expect(prismaService.userVerify.update).toHaveBeenCalled();
      expect(result).toEqual({...mockUserVerify, status: true, code: ''});
    });

    it('should throw an error if the user verification record is not found', async () => {
      jest.spyOn(prismaService.userVerify, 'findFirst').mockResolvedValue(null); // Simulate not found

      await expect(UserComponents.updateUserVerify({
          prisma: prismaService,
          code: '123456',
          userId: 'user-id',
      })).rejects.toThrow(new CustomError("User verification record not found", 404));
    });
  });
    
  
  // Add more tests for other methods as needed
}); 