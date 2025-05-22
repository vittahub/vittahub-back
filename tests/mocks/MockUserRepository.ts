import { UserRepository } from "../../src/repositories/UserRepository";

export const createUserMockRepository = (): jest.Mocked<UserRepository> => {
  const userRepository = new UserRepository({} as any);

  userRepository.create = jest.fn().mockResolvedValue({
    id: 123,
    email: "jose@email.com",
    password: "MyHashedPassword",
    role: "patient"
  });

  userRepository.findByEmail = jest.fn().mockResolvedValue(null);

  return userRepository as unknown as jest.Mocked<UserRepository>;
};