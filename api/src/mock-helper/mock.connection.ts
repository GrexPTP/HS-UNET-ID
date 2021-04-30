import mockQuery from './mock.query';

export default class MockConnection {
  createQueryRunner() {
    return mockQuery();
  }
}
