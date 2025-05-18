import { UserRepository } from "../../src/repositories/UserRepository";
import { createMockKnex, MockQueryBuilder } from "../mocks/mockKnex"
import { Knex } from "knex";
import { User } from "../../src/models/User";

describe("UserRepository", () => {
  let repo: UserRepository;
  let mockBuilder: MockQueryBuilder;
  let mockDb: jest.Mock;

  beforeEach(() => {
    const { db, builder } = createMockKnex();
    mockDb = db;
    mockBuilder = builder;
    repo = new UserRepository(mockDb as unknown as Knex);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user", async () => {
    const userData = { name: 'jose', email: 'jose@email.com', password: 'hashed' };

    const createdUser = await repo.create(userData);

    expect(mockDb).toHaveBeenCalledWith('users');
    expect(mockBuilder.insert).toHaveBeenCalledWith(userData);
    expect(mockBuilder.returning).toHaveBeenCalledWith(['id', 'name', 'email', 'password']);
    expect(createdUser).toEqual(new User(123, 'jose@email.com', 'hashed'));
  });

  it("should find a user by email", async () => {
    const foundUser = await repo.findByEmail('jose@email.com');

    expect(mockDb).toHaveBeenCalledWith('users');
    expect(mockBuilder.where).toHaveBeenCalledWith({ email: 'jose@email.com' });
    expect(mockBuilder.first).toHaveBeenCalled();
    expect(foundUser).toEqual(new User(123, 'jose@email.com', 'hashed'));
  });

  it("should return null if user not found", async () => {
    mockBuilder.first.mockResolvedValueOnce(null);

    const foundUser = await repo.findByEmail('nonexistent@email.com');

    expect(foundUser).toBeNull();
  });
});
