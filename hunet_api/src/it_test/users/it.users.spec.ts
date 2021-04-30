import fetch from 'node-fetch';
import {matchers} from 'jest-json-schema';
import {Logger} from '@nestjs/common';

expect.extend(matchers);
describe('User', async () => {
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
  it('Get user', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
                query {
                    user {
                        birthDate,
                        name,
                        email,
                        gender        
                }
        }`,
      }),
    });
    const data = await result.json();
    const schema = {
      properties: {
        birthDate: {
          type: 'string',
        },
        name: { type: 'string' },
        email: { type: 'string' },
        gender: { type: 'string' },
      },
    };
    // @ts-ignore
    expect(data.data.user).toMatchSchema(schema);
  });
  it('Get doctors', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
                query doctors($pagination: PaginationDto!) {
    doctors(pagination: $pagination) {
     data{
         name
         schedules {
          startDate,
          startTime,
          endTime,
          status
         }
     },
      limit,
      page,
      totalCount
    }
  }`,
        variables: {
          pagination: {
            filter: '',
            limit: 20,
            order: 'ASC',
            page: 1,
          },
        },
      }),
    });
    const data = await result.json();
    Logger.debug(data.data.doctors.data);
  });
});
