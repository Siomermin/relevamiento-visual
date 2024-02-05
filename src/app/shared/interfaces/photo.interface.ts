export type CosasType = 'lindas' | 'feas';

export interface Photo {
  url: string,
  type: CosasType,
  author: string,
  likes: number
}
