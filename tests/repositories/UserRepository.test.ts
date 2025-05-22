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
    const userData = { email: 'jose@email.com', password: 'hashed' };
    console.log("🔧 Dados de entrada para criação:", userData);

    const createdUser = await repo.create(userData);
    console.log("✅ Resultado retornado por create:", createdUser);

    expect(mockDb).toHaveBeenCalledWith('users');
    expect(mockBuilder.insert).toHaveBeenCalledWith(userData);
    expect(mockBuilder.returning).toHaveBeenCalledWith(['id', 'email', 'password']);
    expect(createdUser).toEqual(new User(123, 'jose@email.com', 'hashed'));
  });

  it("should find a user by email", async () => {
    const email = 'jose@email.com';
    console.log("🔍 Procurando usuário com e-mail:", email);

    const foundUser = await repo.findByEmail(email);
    console.log("🔎 Usuário encontrado:", foundUser);

    expect(mockDb).toHaveBeenCalledWith('users');
    expect(mockBuilder.where).toHaveBeenCalledWith({ email });
    expect(mockBuilder.first).toHaveBeenCalled();
    expect(foundUser).toEqual(new User(123, 'jose@email.com', 'hashed'));
  });

  it("should return null if user not found", async () => {
    mockBuilder.first.mockResolvedValueOnce(null);
    const email = 'nonexistent@email.com';
    console.log("❌ Tentando encontrar usuário inexistente:", email);

    const foundUser = await repo.findByEmail(email);
    console.log("🧪 Resultado esperado (null):", foundUser);

    expect(foundUser).toBeNull();
  });
});
