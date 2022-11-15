export default {
  get: jest.fn().mockImplementation(() => Promise.resolve({data: {}})),
}
