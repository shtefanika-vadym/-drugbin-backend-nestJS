import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Drug } from "src/drug/drug.model";
import { DrugController } from "src/drug/drug.controller";
import { DrugService } from "src/drug/drug.service";
import { VisionService } from "src/vision/vision.service";
import { SeederModule } from "nestjs-sequelize-seeder";
import { SeedDrug } from "src/database/seeders/drugs.seed";
import { IpRateLimitMiddleware } from "src/helpers/ip-rate.middleware";

@Module({
  controllers: [DrugController],
  providers: [DrugService, VisionService],
  imports: [
    SequelizeModule.forFeature([Drug]),
    SeederModule.forFeature([SeedDrug]),
  ],
  exports: [DrugService],
})
export class DrugModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpRateLimitMiddleware).forRoutes("drugs/search/:name?");
  }
}
