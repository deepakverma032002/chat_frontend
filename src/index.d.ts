type AddressString = `0x${string}`

type AnyFunction = (...args: any[]) => any

type AnyObject<T = any> = Record<string, T>
type Modify<T, R extends PartialAny<T>> = Omit<T, keyof R> & R

type QueryType = {
  page: number
  limit: number
  search?: string
  type?: string
  sortBy?: string
}
