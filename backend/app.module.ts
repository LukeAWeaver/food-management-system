import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { FoodItemResolver } from 'src/food-item/food-item.resolver'
import { FoodItemService } from 'src/food-item/food-item.service'


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [FoodItemResolver, FoodItemService],
})
export class AppModule {}
