import path from 'node:path';
import { EntityType } from '../configs/global.config';

export function generateBucketKey(
  fileName: string,
  entityType: EntityType,
  entityId: string,
  isPrivate: boolean = false
) {
  return path.join(
    isPrivate ? 'private' : 'public',
    entityType,
    entityId,
    `${Date.now()}${fileName ? `-${fileName}` : ''}`
  );
}
