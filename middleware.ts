import { i18nRouter } from 'next-i18n-router';
import defaultConfig from './config/config';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return i18nRouter(request, defaultConfig.i18n);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};