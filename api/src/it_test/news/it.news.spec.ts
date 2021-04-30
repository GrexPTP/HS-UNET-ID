import fetch from 'node-fetch';
import {matchers} from 'jest-json-schema';

expect.extend(matchers);
describe('News', async () => {
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
  it('Retrieve news', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
        query allNews($pagination: PaginationDto!) {
    allNews(pagination: $pagination) {
     data{
         createdAt,
         content,
        description,
        descriptionImage,
        title,
     },
      limit,
      page,
      totalCount
    }
  }`,
        variables: {
          pagination: {
            filter: '',
            limit: 10,
            order: 'ASC',
            page: 1,
          },
        },
      }),
    });
    const data = await result.json();
    const schema = {
      properties: {
        data: { type: 'array' },
        limit: { type: 'number' },
        page: { type: 'number' },
        totalCount: { type: 'number' },
      },
      required: ['data', 'limit', 'page', 'totalCount'],
    };
    // @ts-ignore
    expect(data.data.allNews).toMatchSchema(schema);
  });
  it('Retrieve a piece of news', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
        query news($id: Int!) {
    news(id: $id) {
      createdAt
      content
      creator {
        name
      }
      description
      descriptionImage
      title
    }
  }`,
        variables: {
          id: 1,
        },
      }),
    });
    const data = await result.json();
    console.log(data);
    // const schema = {
    //   properties: {
    //     data: { type: 'array' },
    //     limit: { type: 'number' },
    //     page: { type: 'number' },
    //     totalCount: { type: 'number' },
    //   },
    //   required: ['data', 'limit', 'page', 'totalCount'],
    // };
    // // @ts-ignore
    // expect(data.data.allNews).toMatchSchema(schema);
  });
});
