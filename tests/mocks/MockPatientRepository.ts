import { PatientRepository } from "../../src/modules/patient/repositories/PatientRepository";

export const createPatientMockRepository = (): jest.Mocked<PatientRepository> => {
  const patientRepository = new PatientRepository({} as any)

  patientRepository.create = jest.fn().mockResolvedValue({
    id: 123,
    user_id: 123,
    name: 'jose',
    birthdate: '2001-11-05',
    sex: 'male',
    address: {
      street: "R. Jaime Leonel Chaves",
      number: "2134",
      country: "Brazil",
      city: "Limoeiro Do Norte",
      zip_code: "6293000"
    },
    phone_1: '8899610940',
    phone_2: '88993651236',
    cpf: '36938081042'
  });

  return patientRepository as unknown as jest.Mocked<PatientRepository>;
}