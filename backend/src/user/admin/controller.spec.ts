import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { AdminUser } from './user.entity';
import { AdminUserController } from './controller';
import { UsersAdminService } from './service';
import { AdminAuthStrategy } from './local.strategy';
import { Role } from '../type';

const mockUsers = [
  {
    id: 1,
    email: 'email1@email.com',
    firstName: 'firstName1',
    lastName: 'lastName1',
    password: 'password1',
    type: Role.admin,
  },
  {
    id: 2,
    email: 'email2@email.com',
    firstName: 'firstName2',
    lastName: 'lastName2',
    password: 'password2',
    type: Role.admin,
  },
];
const sanitize = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  password,
  ...rest
}: AdminUser & { id?: number }) => rest;

describe('AdminUserController', () => {
  // let usersAdminService: UsersAdminService;
  let adminUserController: AdminUserController;
  let newUser: AdminUser;

  beforeEach(async () => {
    newUser = undefined;

    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersAdminService,
        AdminAuthStrategy,
        {
          provide: getRepositoryToken(AdminUser),
          useValue: {
            findOneBy({ email, id }) {
              return mockUsers.find((c) => c.email === email || c.id === id);
            },
            save(d) {
              newUser = { id: 2, ...d };
              return newUser;
            },
            find() {
              return mockUsers;
            },
          },
        },
      ],
      controllers: [AdminUserController],
    }).compile();

    // usersAdminService = moduleRef.get<UsersAdminService>(UsersAdminService);
    adminUserController =
      moduleRef.get<AdminUserController>(AdminUserController);
  });

  it('loginAdmin', async () => {
    // jest
    //   .spyOn(usersAdminService, 'login')
    //   .mockImplementation(() => Promise.resolve(result));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = mockUsers[0];

    expect(
      await adminUserController.loginAdmin({
        email: 'email1@email.com',
        password: 'password',
      }),
    ).toEqual(result);
  });

  it('registerAdmin', async () => {
    expect(
      await adminUserController.registerAdmin({
        email: 'email1@email.com',
        password: 'password',
        firstName: 'firstName',
        lastName: 'lastName',
      }),
    ).toEqual({ id: newUser.id });
  });

  it('getUsers', async () => {
    expect(await adminUserController.getUsers()).toEqual(
      mockUsers.map(sanitize),
    );
  });

  it('getUser', async () => {
    expect(await adminUserController.getUser({ id: 1 })).toEqual(
      sanitize(mockUsers[0]),
    );
  });
});
