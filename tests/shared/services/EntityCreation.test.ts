import { UserService } from "../../../src/shared/services/EntityCreation";
import { Role } from "../../../src/shared/types/Enums";
import { createUserMockRepository } from "../../modules/auth/mock/MockUserRepository"

describe('UserService.__createUser', () => {
    let userRepository: ReturnType<typeof createUserMockRepository>;
    let service: UserService;

    beforeEach(() => {
        userRepository = createUserMockRepository();
        service = new UserService(userRepository);
    });
    
    it('should create a user', async() => {
        const data = {email: 'jose@email.com', password: 'NotHashed', role: 'patient' as Role};

        const result =  await service.__createUser(data.email, data.password, data.role, {} as any)

        expect(result).toEqual({
            id: 123,
            email: data.email,
            password: 'MyHashedPassword',
            role: data.role
        });
        expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email);
        expect(userRepository.create).toHaveBeenCalled(); 
    });

    it('should fail to create a user that already exist', async() => {
        const existingData = {email: 'jose@email.com', password: 'NotHashed', role: 'patient' as Role};
        userRepository.findByEmail.mockResolvedValueOnce({id: 123, ...existingData});

        const result =  await service.__createUser(existingData.email, existingData.password, existingData.role, {} as any)

        expect(userRepository.findByEmail).toHaveBeenCalledWith(existingData.email);
        expect(userRepository.create).not.toHaveBeenCalled();1
        expect(result).toBeNull();
    });
})