import { SetMetadata } from '@nestjs/common';
export const jwtConstants = {
  secret: 'PLEASE-CONTRACT-ME',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
