import Joi from 'joi';
import { SortOption } from '../configs/global.config';
import { PaginationOptions } from '../types/global.types';

export const PaginationValidator = Joi.object<PaginationOptions>({
  page: Joi.number().required(),
  perPage: Joi.number().required().default(20),
  sortOption: Joi.string()
    .required()
    .valid(...Object.values(SortOption))
    .default(SortOption.ASC)
});
