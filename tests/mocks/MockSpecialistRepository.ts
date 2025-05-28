import { SpecialistRepository } from "../../src/modules/specialist/repositories/SpecialistRepository";

export const createSpecialistMockRepository = (): jest.Mocked<SpecialistRepository> => {
  const specialistRepository = new SpecialistRepository({} as any)

  specialistRepository.create = jest.fn().mockResolvedValue({
    id: 123,
    user_id: 123,
    clinic_id: 123,
    name: 'leon',
    speciality: 'cardiologist',
    phone: '8899610940',
  });

  return specialistRepository as unknown as jest.Mocked<SpecialistRepository>;
}