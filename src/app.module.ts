import { Module } from '@nestjs/common';
import { AuthController, UserController, CategoryController, ServiceCategoryController, PricingController, EndpointController } from './controller';
import { PrismaModule } from './common/prisma.module';
import { AuthService, CategoryService, EndpointService, PricingService, ServiceCategoryService, UserService } from './service';
import { AuthModule } from './auth.module';
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController, AuthController, CategoryController, ServiceCategoryController, PricingController, EndpointController],
  providers: [UserService, AuthService, CategoryService, ServiceCategoryService, PricingService, EndpointService],
})
export class AppModule {}
