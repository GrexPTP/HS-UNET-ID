import fetch from 'node-fetch';
import {matchers} from 'jest-json-schema';

expect.extend(matchers);
describe('Citis', async () => {
  const username = 'tindt';
  const password = '123456';
  let setUpData = null;
  beforeEach(async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            mutation login($username: String!, $password: String!) {
               login(username: $username, password: $password) {
                  token,
                  message
               }
            }`,
        variables: {
          username,
          password,
        },
      }),
    });
    setUpData = await result.json();
  });
  it('Login success', () => {
    const schema = {
      properties: {
        token: { type: 'string' },
        message: { type: 'string' },
      },
      required: ['token', 'message'],
    };
    // @ts-ignore
    expect(setUpData.data.login).toMatchSchema(schema);
    expect(setUpData).toBeDefined();
  });
  it('Retrieve cities', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
        query {
            cities {
                id,
                name
            }
        }`,
      }),
    });
    const data = await result.json();
    const schema = {
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
      required: ['id', 'name'],
    };
    // @ts-ignore
    expect(data.data.cities).toMatchSchema(schema);
  });
});
