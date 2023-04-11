import { Module } from "@nestjs/common";
import { ExpiredProductsService } from "src/expired-products/expired-products.service";
import { ExpiredProductsController } from "src/expired-products/expired-products.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Company } from "src/company/company.model";
import { ExpiredProduct } from "src/expired-products/expired-products.model";
import { TokenUtils } from "src/utils/token.utils";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [ExpiredProductsService, TokenUtils],
  controllers: [ExpiredProductsController],
  imports: [SequelizeModule.forFeature([Company, ExpiredProduct]), AuthModule],
})
export class ExpiredProductsModule {}
