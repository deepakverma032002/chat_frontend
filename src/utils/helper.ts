import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AnyObject } from 'yup'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getQueries = (obj: AnyObject): string => {
  return Object.keys(obj ?? {})
    .map(item => `${item}=${obj[item]}`)
    .join('&')
}

type objType = { [key: string]: any }
export const removeEmptyKey = (data: objType): objType => {
  const params = { ...data }
  Object.keys(params).forEach(
    key => (params[key] === undefined || params[key] === '' || params[key] === 0) && delete params[key]
  )
  return params
}
