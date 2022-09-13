'use strict';

export const CREATE_USER_URL = process.env.CREATE_USER_URL || 'http://localhost:8000/user-api-dev/users';
export const LOGIN_USER_URL = process.env.LOGIN_USER_URL || 'http://localhost:8000/user-api-dev/login';
export const PATCH_USER_URL = process.env.PATCH_USER_URL || 'http://localhost:8000/user-api-dev/users/';
export const DELETE_USER_URL = process.env.DELETE_USER_URL || 'http://localhost:8000/user-api-dev/users/';
