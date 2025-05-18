
jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
    const mockReq = {} as any;
    const mockRes = {
        status: jest.fn().mockReturnThis,
        json: jest.fn(),
    } as any;
    const mockNext = jest.fn()


    beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test_secret';
    });
})

