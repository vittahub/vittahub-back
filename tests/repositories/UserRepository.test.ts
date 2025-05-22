import { UserRepository } from "../../src/repositories/UserRepository";
import { createUserMockKnex } from "../mocks/UserMockKnex";
import { Role } from "../../src/types/Enums";


describe("User Repository", () => {
    const { userDb, userBuilder } = createUserMockKnex();
    const userRepository = new UserRepository(userDb as any);

    it("should create new user", async () => {
        const data = { id: 123, email: 'jose@email.com', password: 'hashed', role: 'patient'};
        console.log("🔧 Dados de entrada para criação:", data);

        const result = await userRepository.create(data as any)
        console.log("✅ Resultado retornado por create:", result);

        expect(userBuilder.insert).toHaveBeenCalledWith(data);
        expect(userBuilder.returning).toHaveBeenCalledWith("*");
        expect(result).toEqual({
            id: 123,
            email: 'jose@email.com',
            password: 'hashed',
            role: 'patient'
        });
    });

    it('should find a user that already exists', async() => {
        const id = 123;
        const expected = { id: 123, email: 'jose@email.com', password: 'hashed', role: 'patient'};

        const result = await userRepository.find(id);

        expect(userBuilder.where).toHaveBeenCalledWith({id});
        expect(userBuilder.first).toHaveBeenCalled();
        expect(result).toEqual(expected)
    });

    it('should return all users on database', async() => {
        const expected = [
            { id: 123, email: 'jose@email.com', password: 'hashed', role: 'patient' },
            { id: 456, email: 'maria@email.com', password: 'hashed', role: 'specialist' },
        ];

        const result = await userRepository.findAll();

        expect(userBuilder.select).toHaveBeenCalledWith('*');
        expect(result).toEqual(expected);
    });

    it('should update existing user', async() => {
        const id = 123;
        const updateData = { role: 'employee' as Role };
        const expected = { id: 123, email: 'jose@email.com', password: 'hashed', role: 'employee' };
        userBuilder.returning.mockResolvedValueOnce([expected]);

        const result = await userRepository.update(id, updateData);

        expect(userBuilder.where).toHaveBeenCalledWith({ id });
        expect(userBuilder.update).toHaveBeenCalledWith(updateData);
        expect(userBuilder.returning).toHaveBeenCalledWith("*");
        expect(result).toEqual(expected);
    })

    it('shouldn\'t delete if id is wrong  ', async () => {
        const id = 425;
        userBuilder.del.mockResolvedValueOnce(0);

        const result = await userRepository.delete(id);

        expect(userBuilder.where).toHaveBeenCalledWith({ id });
        expect(userBuilder.del).toHaveBeenCalled();
        expect(result).toBe(false);
    });

    it('should return user with informed email', async() => {
        const email = 'jose@email.com';
        const expected = { id: 123, email: 'jose@email.com', password: 'hashed', role: 'patient'};
        console.log("🔍 Procurando usuário com e-mail:", email);

        const result = await userRepository.findByEmail(email)
        console.log("🔎 Usuário encontrado:", result);

        expect(userBuilder.where).toHaveBeenCalledWith({email});
        expect(userBuilder.first).toHaveBeenCalled();
        expect(result).toEqual(expected);
    });

    it("should return null if user not found", async () => {
      userBuilder.first.mockResolvedValueOnce(null);
      const email = 'nonexistent@email.com';
      console.log("❌ Tentando encontrar usuário inexistente:", email);

      const result = await userRepository.findByEmail(email);
      console.log("🧪 Resultado esperado (null):", result);

      expect(result).toBeNull();
    });
});