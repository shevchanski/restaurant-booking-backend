import Joi from 'joi';
import { SortOption } from '../configs/global.config';
import { PaginationOptions } from '../types/global.types';

export const PaginationValidator = Joi.object<PaginationOptions>({
  page: Joi.number().required().min(1).default(1).integer(),
  perPage: Joi.number().required().min(20).max(50).default(20).integer(),
  sortOption: Joi.string()
    .required()
    .valid(...Object.values(SortOption))
    .default(SortOption.ASC),
  searchTerm: Joi.string().optional().default('')
});
