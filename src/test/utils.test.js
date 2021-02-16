import { parse, or, split } from '../utils'

describe('or', () => {
  it('should dtrt', () => {
    const t = () => true
    const f = () => false

    expect(or(f, f, t)('')).toEqual(true)
    expect(or(f, t, f)('')).toEqual(true)
    expect(or(f, f, f)('')).toEqual(false)
  })
})

describe('split', () => {
  it('should dtrt', () => {
    const coll = [1, 2, 3, 4, 5]
    const isEven = num => !Boolean(num % 2)
    const [even, odd] = split(coll, isEven)
    expect(even.every(isEven)).toBe(true)
    expect(odd.some(isEven)).toBe(false)
  })
})

describe('parse', () => {
  it('should dtrt', () => {
    const input = 'hello! my @name name !2 is #autumn /and whateber'

    expect(parse(input)).toEqual({
      label: ['name'],
      project: 'autumn',
      section: 'and',
      priority: 2,
      text: 'hello! my name is whateber',
    })
  })
})
