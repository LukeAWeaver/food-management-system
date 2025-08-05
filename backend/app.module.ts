import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { FoodItemResolver } from 'src/food-item/food-item.resolver'
import { FoodItemService } from 'src/food-item/food-item.service'
import { PrismaService } from 'prisma/prisma.service'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [FoodItemResolver, FoodItemService, PrismaService],
})
export class AppModule {}
