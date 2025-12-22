import { FilterQuery, PopulateOptions } from 'mongoose';

export interface PaginationOptions<T> {
  filter?: FilterQuery<T>;
  select?: any;
  populate?: PopulateOptions | PopulateOptions[];
  sort?: any;
}
