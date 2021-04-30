import fetch from 'node-fetch';
import {matchers} from 'jest-json-schema';

expect.extend(matchers);
describe('Examinations', async () => {
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
  it('Create examinations', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
                mutation createExamination($createExaminationInput: CreateExaminationInput!) {
                    createExamination(createExaminationInput: $createExaminationInput){
                    createdAt,
                    customerDescription,
                    doctor {
                        name,
                    },
                    doctorFeedback
                    }
                }`,
        variables: {
          createExaminationInput: {
            customerDescription: 'Test create  customerDescription',
            diseaseName: 'Carcinoma',
            image:
              'https://storage.googleapis.com/origin-image-hunet/01_29_21_07_3501_scar-stock.jpg',
            resultImage:
              'https://storage.googleapis.com/result-image-hunet/01_29_21_07_3501_scar-stock.jpg',
            patientId: 2,
            status: 'pending',
            predict:
              '{"carcinoma":0.00012241971853654832,"melanoma":0.000809278863016516,"normal":0.9990311861038208,"pigmented": 3.712949910550378e-05}',
          },
        },
      }),
    });
    const data = await result.json();
    const examinationSchema = {
      properties: {
        createdAt: {type: 'string'},
        customerDescription: {type: 'string'},
        doctor: {type: 'object'},
      },
      required: ['createdAt', 'customerDescription', 'doctor'],
    };
    const doctorSchema = {
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    };
    // @ts-ignore
    expect(data.data.createExamination).toMatchSchema(examinationSchema);
    // @ts-ignore
    expect(data.data.createExamination.doctor).toMatchSchema(doctorSchema);
  });
  it('Retrieve examinations', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
        query diseases($pagination: PaginationDto!) {
            diseases(pagination: $pagination) {
            data    {
                name
            },
            limit,
            page,
            totalCount
           }
        }`,
        variables: {
          pagination: {
            filter: '',
            limit: 3,
            order: 'DESC',
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
    expect(data.data.examinations).toMatchSchema(schema);
  });
  it('Retrieve an examination', async () => {
    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setUpData.data.login.token}`,
      },
      body: JSON.stringify({
        query: `
        query examination($id: Int!) {
            examination(id: $id) {
                createdAt
                customerDescription
                resultImage
                image
                status
                createdAt
                disease{
                     name
                }     
                examinationDetails {
                  disease {
                     name
                  }     
                 percentage
                }
                doctor  {
                    name
                    phone
                    profileImage
                }
            }
          }`,
        variables: {
          id: 58,
        },
      }),
    });
    const data = await result.json();
    const examinationSchema = {
      properties: {
        createdAt: { type: 'string' },
        customerDescription: { type: 'string' },
        resultImage: { type: 'string' },
        image: { type: 'string' },
        status: { type: 'string' },
        disease: {
          type: 'object',
        },
        examinationDetails: {
          type: 'array',
        },
        doctor: {
          type: 'object',
        },
      },
      required: [
        'createdAt',
        'customerDescription',
        'resultImage',
        'image',
        'status',
        'disease',
        'examinationDetails',
        'doctor',
      ],
    };
    // @ts-ignore
    expect(data.data.examination).toMatchSchema(examinationSchema);
  });
});
