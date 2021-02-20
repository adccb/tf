import { parse } from '../'

describe('parse', () => {
  it('should dtrt', () => {
    const input = 'hello! my @name name !2 is #autumn /and whateber'

    expect(parse(input)).toEqual({
      label: ['name'],
      project: 'autumn',
      section: 'and',
      priority: 2,
      task: 'hello! my name is whateber',
    })
  })
})
