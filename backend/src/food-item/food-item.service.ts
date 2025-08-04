import { Injectable } from '@nestjs/common'
import { UsageType } from './food-item.model'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class FoodItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsageTypeSorted(usageType: UsageType) {
    return this.prisma.foodItem.findMany({
      where: { usageType },
      orderBy: { expirationDate: 'asc' }
    })
  }

  async create(data: {
    name: string
    expirationDate: Date
    location: string
    usageType: UsageType
  }) {
    return this.prisma.foodItem.create({ data })
  }
}
