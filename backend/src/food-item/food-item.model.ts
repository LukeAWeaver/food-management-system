import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum UsageType {
  snack = 'snack',
  meal_ingredient = 'meal_ingredient'
}

registerEnumType(UsageType, { name: 'UsageType' })

@ObjectType()
export class FoodItem {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  expirationDate: Date

  @Field()
  location: string

  @Field(() => UsageType)
  usageType: UsageType
}
