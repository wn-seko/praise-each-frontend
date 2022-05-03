import dayjs from 'dayjs';
import JwtDecode from 'jwt-decode';

import { User } from './user';

interface AuthUser extends User {
  exp: number;
}

const isExpired = (exp: number) => {
  const expire = dayjs(exp * 1000);
  const now = dayjs();
  return now.isAfter(expire);
};

const verifyToken = (token: string): string => {
  const json = JwtDecode(token) as AuthUser;

  if (isExpired(json.exp)) {
    throw new Error('Token is expired.');
  }

  return token;
};

const verifyUser = (json: AuthUser): User => {
  if (!json || !json.exp || !json.id || !json.name || !json.icon) {
    throw new Error('Token is invalid.');
  }

  if (isExpired(json.exp)) {
    throw new Error('Token is expired.');
  }

  return json as User;
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('auth_token') || '';
};

export const getActiveToken = () => {
  const token = getTokenFromLocalStorage();

  try {
    return verifyToken(token);
  } catch (e) {
    return null;
  }
};

export const unsetTokenFromLocalStorage = () => {
  localStorage.removeItem('auth_token');
};

export const setTokenToLocalStorage = (token: string) => {
  if (!token) {
    return;
  }

  localStorage.setItem('auth_token', token);
};

export const parseTokenToUser = (token: string) => {
  try {
    const json = JwtDecode(token) as AuthUser;
    return verifyUser(json);
  } catch (e) {
    return null;
  }
};
