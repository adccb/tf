import { main } from '../'

import mockApi from '../api' // TODO: change me to mock api when the prod api is finished

describe('main', () => {
  const run = (partialConfig, partialApi) =>
    main({ ...partialConfig }, { ...mockApi, ...partialApi })

  it('should handle the create case', () => {
    const putNote = jest.fn(mockApi.putNote)
    const mockInput = 'say hi !1 #kyruus @people/jess /meta'
    run({ todo: mockInput }, { putNote })
    expect(putNote).toHaveBeenCalledWith({
      content: 'say hi',
      priority: 1,
      labels: [3],
      project_id: 1,
      section_id: 9,
    })
  })

  it('should handle the complete case', () => {
    const completeNote = jest.fn(mockApi.completeNote)
    run({ complete: true }, { completeNote })
    expect(completeNote).toHaveBeenCalledWith({
      content: 'say hi',
      priority: 1,
      labels: [3],
      project_id: 1,
      section_id: 9,
    })
  })

  it('should handle the getLabels case', () => {
    const getLabels = jest.fn(mockApi.getLabels)
    run({ labels: true }, { getLabels })
    expect(getLabels).toHaveBeenCalledWith('ALL')
  })

  it('should handle the getProjects case', () => {
    const getProjects = jest.fn(mockApi.getProjects)
    run({ projects: true }, { getProjects })
    expect(getProjects).toHaveBeenCalledWith('ALL')
  })

  it('should handle the getSections case', () => {
    const getSections = jest.fn(mockApi.getSections)
    run({ sections: true }, { getSections })
    expect(getSections).toHaveBeenCalledWith('kyruus')
  })

  it('should handle the getTasks case', () => {
    const getTasks = jest.fn(mockApi.getTasks)
    run({ tasks: true }, { getTasks })
    expect(getTasks).toHaveBeenCalledWith('ALL')
  })
})
