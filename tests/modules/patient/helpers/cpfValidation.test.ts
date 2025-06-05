import isValidCPF from '../../../../src/modules/patient/helpers/cpfValidation';

describe('isValidCPF', () => {
  it('should return true for a valid cpf with formatting', () => {
    const validCPF = '369.380.810-42';

    expect(isValidCPF(validCPF)).toBe(true);
  });

  it('should return true for a valid cpf without formatting', () => {
    const validCPF = '36938081042';

    expect(isValidCPF(validCPF)).toBe(true);
  });

  it('should return false for incorrect cpf number', () => {
    const invalidCPF = '36938081041';

    expect(isValidCPF(invalidCPF)).toBe(false);
  });

  it('should return false for CPF with less than 11 digits', () => {
    const shortCPF = '3693808104';

    expect(isValidCPF(shortCPF)).toBe(false);
  });

  it('should return false for CPF with more than 11 digits', () => {
    const longCPF = '369380810423';
    
    expect(isValidCPF(longCPF)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isValidCPF('')).toBe(false);
  });
});