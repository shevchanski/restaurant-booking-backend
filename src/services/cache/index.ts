import apicache from 'apicache';

const apiCacheOptions: apicache.Options = {
  defaultDuration: '5 minutes'
};

if (process.env.NODE_ENV === 'dev') {
  // enables debug logging if node_env in dev-mode
  apiCacheOptions.debug = true;
}

const addToCache = (duration?: string) => {
  return apicache.options(apiCacheOptions).middleware(duration);
};

const deleteCache = (keyToDel: string) => {
  return apicache.clear(keyToDel);
};

export const cacheService = { addToCache, deleteCache };
