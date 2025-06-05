import { isAdult } from "../../../src/modules/patient/PatientModel";

describe('isAdult', () => {
    it('should return true for ages above 18', () => {
        const above18ISO = '1999-05-08'
        const above18BR = '08/05/1999'

        expect(isAdult(above18ISO)).toBe(true);
        expect(isAdult(above18BR)).toBe(true);
    })

    it('should return false for ages bellow 18', () => {
        const above18 = '08/05/2010'

        expect(isAdult(above18)).toBe(false);
    })

    it ('should return false on missing information', () => {
        expect(isAdult('05/1999')).toBe(false);
        expect(isAdult('08/1999')).toBe(false);
        expect(isAdult('')).toBe(false);
    })
});