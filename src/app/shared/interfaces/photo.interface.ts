export type CosasType = 'lindas' | 'feas';

export interface Photo {
  id: string,
  url: string,
  type: CosasType,
  author: string,
  likes: number,
  timestamp: number,
  filename: string
}
