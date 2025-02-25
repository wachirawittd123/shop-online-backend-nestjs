import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCategoryService } from '../service.service';
import { PrismaService } from '../../../common/prisma.service';
import { ServiceComponents } from '../service.components';
import { CategoryComponents } from '../../category/category.components';
import { ICreateService, IGetService, IQuerys, IService, IUpdateService, IUserProfile } from 'src/interface';
import { MockCommonUnitTest } from '../../../mock-unit-test/common';

describe('ServiceCategoryService', () => {
  let service: ServiceCategoryService;
  let prismaService: PrismaService;
  let services: IService
  let userProfile: IUserProfile;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceCategoryService,
        {
          provide: PrismaService,
          useValue: {
            service: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        ServiceComponents,
        CategoryComponents,
      ],
    }).compile();
    services = {
        "id": "1",
        "name": "Test Service",
        "apiCategoriesId": "1",
        "price": 100,
        "description": "description service 2",
        "createdBy": "1",
        "updatedBy": "1",
    }
    userProfile = MockCommonUnitTest.MockUnitUserProfile()
    service = module.get<ServiceCategoryService>(ServiceCategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getServices', () => {
    it('should return an array of services', async () => {
      const args: IQuerys = { query: 'test', skip: 0, limit: 10 };
      const result: IService[] = [services];
      jest.spyOn(prismaService.service, 'findMany').mockResolvedValue(result  as any);

      expect(await service.getServices(args)).toEqual(result);
    });
  });

  describe('getService', () => {
    it('should return a single service', async () => {
      const args: IGetService = { id: "1" };
      const result = { id: "1", name: 'Test Service' };
      jest.spyOn(ServiceComponents, 'findService').mockResolvedValue(result as any);

      expect(await service.getService(args)).toEqual(result);
    });
  });

  describe('createService', () => {
    it('should create and return a new service', async () => {
      const args: ICreateService | any = { ...services, name: 'New Service' };
      const category = { id: "1", name: 'Category' };
      const result = { id: "1", name: 'New Service' };

      jest.spyOn(CategoryComponents, 'findCategory').mockResolvedValue(category);
      jest.spyOn(prismaService.service, 'create').mockResolvedValue(result as any);

      expect(await service.createService(args, userProfile)).toEqual(result);
    });
  });

  describe('updateService', () => {
    it('should update and return the updated service', async () => {
      const args: IUpdateService | any = { ...services, name: 'Updated Service' };
      const serviceData = { id: "1", name: 'Old Service' };
      const category = { id: "1", name: 'Category' };
      const result = { id: "1", name: 'Updated Service' };

      jest.spyOn(service, 'getService').mockResolvedValue(serviceData);
      jest.spyOn(CategoryComponents, 'findCategory').mockResolvedValue(category);
      jest.spyOn(prismaService.service, 'update').mockResolvedValue(result as any);

      expect(await service.updateService(args, userProfile)).toEqual(result);
    });
  });

  describe('deleteService', () => {
    it('should delete and return the deleted service', async () => {
      const args: IGetService = { id: "1" };
      const serviceData = { id: "1", name: 'Service to Delete' };

      jest.spyOn(service, 'getService').mockResolvedValue(serviceData);
      jest.spyOn(prismaService.service, 'delete').mockResolvedValue(serviceData as any);

      expect(await service.deleteService(args)).toEqual(serviceData);
    });
  });
});