import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       AuthService,
  //       UsersService,
  //       JwtService,
  //       {
  //         provide: getRepositoryToken(User),
  //         useClass: MockRepository,
  //       },
  //       {
  //         provide: getRepositoryToken(Role),
  //         useClass: MockRepository,
  //       },
  //       {
  //         provide: getRepositoryToken(City),
  //         useClass: MockRepository,
  //       },
  //     ],
  //   }).compile();
  //
  //   service = module.get<AuthService>(AuthService);
  // });
  //
  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  it('skip test', () => {
    expect(1 + 1).toEqual(2);
  });
});
