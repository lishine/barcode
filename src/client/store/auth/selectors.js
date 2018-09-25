import { DOMAIN } from './constants'

export const email = state => state[DOMAIN].email
export const token = state => state[DOMAIN].token
export const isAuth = state => !!state[DOMAIN].token
