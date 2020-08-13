import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'Mary Paris',
      email: 'maryparis@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Walt Green',
      email: 'waltgreen@example.com',
      password: '123456',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Milenna Frank',
      email: 'milennafrank@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2, user3]);
  });
});
