import { MockQueryBuilder } from "../../../shared/MockQueryBuilder";

export const createUserMockKnex = (): { userDb: jest.Mock; userBuilder: MockQueryBuilder } => {
  const userBuilder: MockQueryBuilder = {
    insert: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([
      { id: 123, email: 'jose@email.com', password: 'hashed', role: 'patient'},
    ]),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue({
      id: 123, email: 'jose@email.com', password: 'hashed', role: 'patient',
    }),
    select: jest.fn().mockResolvedValue([
      { id: 123, email: 'jose@email.com', password: 'hashed', role: 'patient'},
      { id: 456, email: 'maria@email.com', password: 'hashed', role: 'specialist'},
    ]),
    update: jest.fn().mockReturnThis(),
    del: jest.fn().mockResolvedValue(1),
  };

  const userDb = jest.fn(() => userBuilder);
  return { userDb, userBuilder };
};