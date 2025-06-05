import { UserService } from "../../../src/shared/services/EntityCreation";

export const createUserServiceMock = (): jest.Mocked<UserService> => {
    const mock = new UserService({} as any);

    mock.__createUser = jest.fn();
    mock.CreateWithUser = jest.fn();

    return mock as unknown as jest.Mocked<UserService>;
}