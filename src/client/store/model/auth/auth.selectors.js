import { DOMAIN } from './auth.constants'

export const getEmail = state => state[DOMAIN].email
export const getToken = state => state[DOMAIN].token
export const isAuth = state => !!state[DOMAIN].token
