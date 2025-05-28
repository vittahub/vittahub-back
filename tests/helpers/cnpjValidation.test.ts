import { isValidCNPJ } from '../../src/modules/clinic/helpers/cnpjValidation';

describe('isValidCNPJ', () => {
  it('should return true for a valid CNPJ with formatting', () => {
    const validCNPJ = '18.848.749/0001-59';
    expect(isValidCNPJ(validCNPJ)).toBe(true);
  });

  it('should return true for a valid CNPJ without formatting', () => {
    const validCNPJ = '18848749000159';
    expect(isValidCNPJ(validCNPJ)).toBe(true);
  });

  it('should return false for incorrect CNPJ number', () => {
    const invalidCNPJ = '45723174000111';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });

  it('should return false for CNPJ with less than 14 digits', () => {
    const shortCNPJ = '1884874900015';
    expect(isValidCNPJ(shortCNPJ)).toBe(false);
  });

  it('should return false for CNPJ with more than 14 digits', () => {
    const longCNPJ = '188487490001590';
    expect(isValidCNPJ(longCNPJ)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isValidCNPJ('')).toBe(false);
  });
});
