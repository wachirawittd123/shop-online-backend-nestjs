import { Test, TestingModule } from '@nestjs/testing';
import { EndpointService } from '../endpoint.service';
import { PrismaService } from '../../../common/prisma.service';
import { EndpointComponents } from '../endpoint.components';
import { IEndpoint, IService, IUserProfile } from 'src/interface';
import { MockCommonUnitTest } from '../../../mock-unit-test/common';
import { CustomError } from 'src/service/common.components';

describe('EndpointService', () => {
  let service: EndpointService;
  let prismaService: PrismaService;
  let userProfile: IUserProfile;
  let mockEndpoint: IEndpoint;
  let mockService: IService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndpointService,
        {
          provide: PrismaService,
          useValue: {
            endpoint: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
            service: {
              findFirst: jest.fn(),
            }
          },
        },
      ],
    }).compile();
    userProfile = MockCommonUnitTest.MockUnitUserProfile();
    mockEndpoint = { 
        id: "1", 
        name: 'Test Endpoint', 
        apiServiceId: "1", 
        description: "Test Description", 
        requestUrl: "https://test.com", 
        requestMethod: "GET", 
        creditPerRequest: 1, 
        createdOn: new Date(),
        updatedOn: new Date()
    }
    service = module.get<EndpointService>(EndpointService);
    mockService = {
        "id": "1",
        "name": "Test Service",
        "apiCategoriesId": "1",
        "price": 100,
        "description": "description service 2",
        "createdBy": "1",
        "updatedBy": "1",
    };
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEndpoints', () => {
    it('should return an array of endpoints', async () => {
      jest.spyOn(prismaService.endpoint, 'findMany').mockResolvedValue(mockEndpoint as any);

      const result = await service.getEndpoints({ query: 'Test', skip: 0, limit: 10 });
      expect(result).toEqual(mockEndpoint);
    });
  });

  describe('getEndpoint', () => {
    it('should return a single endpoint', async () => {
      const mockEndpoint = { id: 1, name: 'Test Endpoint' };
      jest.spyOn(EndpointComponents, 'findEndpoint').mockResolvedValue(mockEndpoint);

      const result = await service.getEndpoint({ id: 1 });
      expect(result).toEqual(mockEndpoint);
    });
  });

  describe('createEndpoint', () => {
    it('should create and return a new endpoint', async () => {
      // Mock the service lookup
      jest.spyOn(prismaService.service, 'findFirst').mockResolvedValue(mockService as any);
  
      jest.spyOn(prismaService.endpoint, 'create').mockResolvedValue(mockEndpoint as any);
  
      const result = await service.createEndpoint(mockEndpoint as any, userProfile);
      expect(result).toEqual(mockEndpoint);
    });
  
    it('should throw an error if apiServiceId is not provided', async () => {
      await expect(service.createEndpoint({ ...mockEndpoint, apiServiceId: undefined } as any, userProfile))
        .rejects
        .toThrow(new CustomError("Api service id is required", 400));
    });
  });

  describe('updateEndpoint', () => {
    it('should update and return the updated endpoint', async () => {
      const updatedEndpoint = { ...mockEndpoint, name: 'Updated Endpoint' };
      jest.spyOn(prismaService.endpoint, 'update').mockResolvedValue(updatedEndpoint as any);
      jest.spyOn(EndpointComponents, 'findEndpoint').mockResolvedValue(mockEndpoint);
  
      const result = await service.updateEndpoint(updatedEndpoint as any, userProfile);
      expect(result).toEqual(updatedEndpoint);
    });
  
    it('should throw an error if endpoint id is not provided', async () => {
      await expect(service.updateEndpoint({...mockEndpoint, id: undefined} as any, userProfile))
        .rejects
        .toThrow(new CustomError("Endpoint id is required", 400));
    });
  
    it('should throw an error if endpoint is not found', async () => {
      jest.spyOn(EndpointComponents, 'findEndpoint').mockResolvedValue(null);
  
      await expect(service.updateEndpoint(mockEndpoint as any, userProfile))
        .rejects
        .toThrow(new CustomError("Endpoint not found", 400));
    });
  });
  
  describe('deleteEndpoint', () => {
    it('should delete and return the deleted endpoint', async () => {
      jest.spyOn(prismaService.endpoint, 'delete').mockResolvedValue(mockEndpoint as any);
      jest.spyOn(EndpointComponents, 'findEndpoint').mockResolvedValue(mockEndpoint);
  
      const result = await service.deleteEndpoint({ id: "1" });
      expect(result).toEqual(mockEndpoint);
    });
  
    it('should throw an error if endpoint id is not provided', async () => {
      await expect(service.deleteEndpoint({} as any))
        .rejects
        .toThrow(new CustomError("Endpoint id is required", 400));
    });
  
    it('should throw an error if endpoint is not found', async () => {
      jest.spyOn(EndpointComponents, 'findEndpoint').mockResolvedValue(null);
  
      await expect(service.deleteEndpoint({ id: "1" }))
        .rejects
        .toThrow(new CustomError("Endpoint not found", 400));
    });
  });
});