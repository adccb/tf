import mockApi from './mock'

export default process.env.NODE_ENV === 'test' ? mockApi : mockApi
