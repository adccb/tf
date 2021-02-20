export const startsWith = (marker, string) => string[0] === marker
export const removePunctiation = string => string.slice(1)
export const formatAllWith = formatter => data =>
  console.log(data.map(formatter).join('\n'))
