import { or, split } from '../utils'

describe('or', () => {
  it('should dtrt', () => {
    const t = () => true
    const f = () => false

    expect(or(f, f, t)('')).toEqual(true)
    expect(or(f, t, f)('')).toEqual(true)
    expect(or(f, f, f)('')).toEqual(false)
  })
})
