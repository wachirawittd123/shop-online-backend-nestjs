import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { PrismaService } from '../../../common/prisma.service';
import { CategoryComponents } from '../category.components';
import { ICategory, ICreateCategory, IGetCategory, IUpdateCategory, IUserProfile, IQuerys } from 'src/interface';
import { MockCommonUnitTest } from '../../../mock-unit-test/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;
  let category: ICategory;
  let userProfile: IUserProfile;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: {
            category: {
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
    category = { id: '1', categoriesName: 'test', createdOn: new Date(), updatedOn: new Date(), createdBy: 'test', updatedBy: 'test' };
    userProfile = MockCommonUnitTest.MockUnitUserProfile()
    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const args: IQuerys = { query: 'test', limit: 10, skip: 0 };
      const result: ICategory[] = [category];
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(result);

      expect(await service.getCategories(args)).toEqual(result);
    });
  });

  describe('getCategory', () => {
    it('should return a single category', async () => {
      const args: IGetCategory = { id: 1 };
      const result: ICategory = category;
      jest.spyOn(CategoryComponents, 'findCategory').mockResolvedValue(result);

      expect(await service.getCategory(args)).toEqual(result);
    });
  });

  describe('createCategory', () => {
    it('should create and return a new category', async () => {
      const args: ICreateCategory = { categoriesName: 'new category' };
      
      const result: ICategory = {...category, id: "1", categoriesName: 'new category' };
      jest.spyOn(CategoryComponents, 'findCategory').mockResolvedValue(null);
      jest.spyOn(prisma.category, 'create').mockResolvedValue(result);

      expect(await service.createCategory(args, userProfile)).toEqual(result);
    });

    it('should throw an error if category name already exists', async () => {
      const args: ICreateCategory = { categoriesName: 'existing category' };
      jest.spyOn(CategoryComponents, 'findCategory').mockResolvedValue({ id: "1", categoriesName: 'existing category' });

      await expect(service.createCategory(args, userProfile)).rejects.toThrow('Category name already exists');
    });
  });

  describe('updateCategory', () => {
    it('should update and return the category', async () => {
      const args: IUpdateCategory = { id: "1", categoriesName: 'updated category' };
      const result: ICategory = { ...category, id: "1", categoriesName: 'updated category' };
      jest.spyOn(service, 'getCategory').mockResolvedValue(result);
      jest.spyOn(CategoryComponents, 'findCategory').mockResolvedValue(null);
      jest.spyOn(prisma.category, 'update').mockResolvedValue(result);

      expect(await service.updateCategory(args, userProfile)).toEqual(result);
    });

    it('should throw an error if category not found', async () => {
      const args: IUpdateCategory = { id: "1", categoriesName: 'updated category' };
      jest.spyOn(service, 'getCategory').mockResolvedValue(null);

      await expect(service.updateCategory(args, userProfile)).rejects.toThrow('Category not found');
    });
  });

  describe('deleteCategory', () => {
    it('should delete and return the category', async () => {
      const args: IGetCategory = { id: "1" };
      const result: ICategory = { ...category, id: "1", categoriesName: 'deleted category' };
      jest.spyOn(service, 'getCategory').mockResolvedValue(result);
      jest.spyOn(prisma.category, 'delete').mockResolvedValue(result);

      expect(await service.deleteCategory(args)).toEqual(result);
    });

    it('should throw an error if category not found', async () => {
      const args: IGetCategory = { id: 1 };
      jest.spyOn(service, 'getCategory').mockResolvedValue(null);

      await expect(service.deleteCategory(args)).rejects.toThrow('Category not found');
    });
  });
});
