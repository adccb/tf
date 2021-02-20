export const map = (fn, coll) =>
  coll
    ? typeof fn === 'string'
      ? coll.map(i => i[fn])
      : coll.map(fn)
    : coll => map(fn, coll)
export const filter = fn => coll => coll.filter(fn)
export const or = (...predicates) => string =>
  predicates.reduce((retVal, pred) => retVal || pred(string), false)
export const partition = (collection, ...predicates) =>
  predicates.reduce(
    (toReturn, fn) => ({ ...toReturn, [fn.name]: collection.filter(fn) }),
    {},
  )
export const withDefault = (value, def) => (typeof value === 'boolean' ? def : value)
export const random = coll => coll[Math.floor(Math.random() * coll.length - 1)]
