import { Test, TestingModule } from '@nestjs/testing';
import { PricingService } from '../pricing.service';
import { PrismaService } from '../../../common/prisma.service';
import { PricingComponents } from '../pricing.components';
import { ICreatePricing, IPricing, IUpdatePricing, IUserProfile } from 'src/interface';
import { MockCommonUnitTest } from '../../../mock-unit-test/common';

describe('PricingService', () => {
  let service: PricingService;
  let prisma: PrismaService;
  let userProfile: IUserProfile;
  let pricing: IPricing;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricingService,
        {
          provide: PrismaService,
          useValue: {
            pricing: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    userProfile = MockCommonUnitTest.MockUnitUserProfile()
    pricing = { id: '1', icPerPrice: 100, validatePeriod: 30, min: 1, max: 10, createdOn: new Date(), updatedOn: new Date() }
    service = module.get<PricingService>(PricingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPricings', () => {
    it('should return an array of pricings', async () => {
      const result: any = [pricing];
      jest.spyOn(prisma.pricing, 'findMany').mockResolvedValue(result);

      expect(await service.getPricings({limit: 10, skip: 0, query: ""})).toEqual(result);
    });
  });

  describe('getPricing', () => {
    it('should return a single pricing', async () => {
      jest.spyOn(PricingComponents, 'findPricing').mockResolvedValue(pricing);
      expect(await service.getPricing({ id: '1' })).toEqual(pricing);
    });
  });

  describe('createPricing', () => {
    it('should create and return a new pricing', async () => {
      const newPricing: ICreatePricing = { icPerPrice: 100, validatePeriod: 30, min: 1, max: 10 };
      const result = { ...pricing, ...newPricing, createdBy: userProfile.id, updatedBy: userProfile.id };
      jest.spyOn(prisma.pricing, 'create').mockResolvedValue(result);

      expect(await service.createPricing(newPricing, userProfile)).toEqual(result);
    });
  });

  describe('updatePricing', () => {
    it('should update and return the updated pricing', async () => {
      const updateData: IUpdatePricing = { id: '1', icPerPrice: 150, validatePeriod: 60, min: 1, max: 10 };
      const result: any = { ...pricing, ...updateData, updatedBy: userProfile.id };
      jest.spyOn(PricingComponents, 'findPricing').mockResolvedValue(result);
      jest.spyOn(prisma.pricing, 'update').mockResolvedValue(result);

      expect(await service.updatePricing(updateData, userProfile)).toEqual(result);
    });
  });

  describe('deletePricing', () => {
    it('should delete and return the deleted pricing', async () => {
      jest.spyOn(PricingComponents, 'findPricing').mockResolvedValue(pricing);
      jest.spyOn(prisma.pricing, 'delete').mockResolvedValue(pricing as any);

      expect(await service.deletePricing({ id: '1' })).toEqual(pricing);
    });
  });
});