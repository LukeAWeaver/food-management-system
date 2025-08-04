import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FoodItem, UsageType } from './food-item.model'
import { FoodItemService } from './food-item.service'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
class CreateFoodItemInput {
  @Field()
  name: string

  @Field()
  expirationDate: Date

  @Field()
  location: string

  @Field(() => UsageType)
  usageType: UsageType
}

@Resolver(() => FoodItem)
export class FoodItemResolver {
  constructor(private readonly service: FoodItemService) {}

  @Query(() => [FoodItem])
  foodItemsByUsageType(
    @Args('usageType', { type: () => UsageType }) usageType: UsageType
  ) {
    return this.service.findByUsageTypeSorted(usageType)
  }

  @Mutation(() => FoodItem)
  createFoodItem(@Args('input') input: CreateFoodItemInput) {
    return this.service.create(input)
  }
}
