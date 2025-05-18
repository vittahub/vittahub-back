export type MockQueryBuilder = {
  insert: jest.Mock;
  returning: jest.Mock;
  where: jest.Mock;
  first: jest.Mock;
};

export const createMockKnex = (): { db: jest.Mock; builder: MockQueryBuilder } => {
  const builder: MockQueryBuilder = {
    insert: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([
      { id: 123, name: 'jose', email: 'jose@email.com', password: 'hashed' },
    ]),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue({
      id: 123, name: 'jose', email: 'jose@email.com', password: 'hashed',
    }),
  };

  const db = jest.fn(() => builder);
  return { db, builder };
};