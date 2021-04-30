import fetch from 'node-fetch';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);
describe('Appointments', async () => {
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
  it('Create appointment', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
                mutation createAppointment($createAppointmentInput: CreateAppointmentInput!) {
                createAppointment(createAppointmentInput: $createAppointmentInput){
                      createdAt,
                      description,
                      doctor {
                          name,
                      },
                      id
                      meetingTime
                      patient {
                          name
                      }
                  }
              }`,
        variables: {
          createAppointmentInput: {
            description: 'Hello this is a test',
            doctorId: 7,
            meetingTime: new Date(),
          },
        },
      }),
    });
    const data = await result.json();
    const appointmentSchema = {
      properties: {
        createdAt: { type: 'string' },
        description: { type: 'string' },
        doctor: {
          type: 'object',
        },
        id: { type: 'number' },
        meetingTime: { type: 'string' },
        patient: {
          type: 'object',
        },
      },
      required: [
        'createdAt',
        'description',
        'doctor',
        'id',
        'meetingTime',
        'patient',
      ],
    };
    // @ts-ignore
    expect(data.data.createAppointment).toMatchSchema(appointmentSchema);
  });
  it('Retrieve appointments', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
        query appointments($pagination: PaginationDto!) {
          appointments(pagination: $pagination) {
          data  {
            createdAt,
            description,
            doctor{
             name,
            },
            meetingTime
            patient{
             name
            }
            status
            createdAt
            description
        },
          limit,
          page,
          totalCount
        }
      }
        `,
        variables: {
          pagination: {
            filter: JSON.stringify({
              date: '2021-04-13T08:13:15.000Z',
              status: 1,
            }),
            limit: 20,
            order: 'ASC',
            page: 1,
          },
        },
      }),
    });
    const data = await result.json();
    console.log(data.data.appointments);
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
    expect(data.data.appointments).toMatchSchema(schema);
  });
  // it('Retrieve an appointment', () => {
  //
  // });
});
