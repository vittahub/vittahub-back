export type MockQueryBuilder = {
  insert: jest.Mock;
  returning: jest.Mock;
  where: jest.Mock;
  first: jest.Mock;
  select: jest.Mock;
  update: jest.Mock;
  del: jest.Mock;
};
