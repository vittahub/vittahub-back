    import authMiddleware from '../../src/middleware/authMiddleware';
    import jwt from 'jsonwebtoken';

    jest.mock('jsonwebtoken');

    describe('authMiddleware', () => {
    const mockReq = { headers: { authorization: 'Bearer fake_token' } } as any;
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as any;
    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test_secret';
    });
        
    it('should call next if token is valid', () => {
        const mockPayload = { id: '123' };
        (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

        console.log('Token simulado vai retornar:', mockPayload);

        authMiddleware(mockReq, mockRes, mockNext);

        console.log('mockNext foi chamado?', mockNext.mock.calls.length > 0);

        expect(mockNext).toHaveBeenCalled();
    });


    });
