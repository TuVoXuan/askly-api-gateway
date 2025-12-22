import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationOptions } from './pagination-options.interface';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';

export abstract class BaseRepository<T, Y> {
  constructor(
    protected readonly model: Model<T>,
    private readonly searchableFields: string[] = [],
  ) {}

  async paginate(
    query: PaginationQueryDto,
    options: PaginationOptions<T>,
    mapper?: any,
    search?: string,
  ): Promise<PaginationResponseDto<Y>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    // eslint-disable-next-line prefer-const
    let { filter = {}, populate, select, sort = { createdAt: -1 } } = options;

    // Add search filter if provided and searchableFields are defined
    if (search && this.searchableFields.length > 0) {
      const searchRegex = { $regex: search, $options: 'i' }; // case-insensitive
      const searchFilter = {
        $or: this.searchableFields.map((field) => ({
          [field]: searchRegex,
        })),
      };
      filter =
        filter && Object.keys(filter).length > 0
          ? { $and: [filter, searchFilter] }
          : searchFilter;
    }

    const mongooseQuery = this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    if (select) {
      mongooseQuery.select(select);
    }
    if (populate) {
      mongooseQuery.populate(populate);
    }

    const [data, totalRecords] = await Promise.all([
      mongooseQuery.exec(),
      this.model.countDocuments(filter),
    ]);

    return new PaginationResponseDto<Y>(
      (data as unknown as Y[]).map((item) => mapper.toDomain(item)),
      page,
      limit,
      totalRecords,
    );
  }
}
