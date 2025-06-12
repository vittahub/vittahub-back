import { ClinicRepository } from "../../src/repositories/ClinicRepository";

export const createClinicMockRepository = (): jest.Mocked<ClinicRepository> => {
  const clinicRepository = new ClinicRepository({} as any)

  clinicRepository.create = jest.fn().mockResolvedValue({
    id: 123,
    user_id: 123,
    name: 'clinica do jose',
    cpnj: '18848749000159',
    address: {
      street: "R. Jaime Leonel Chaves",
      number: "2134",
      country: "Brazil",
      city: "Limoeiro Do Norte",
      zip_code: "6293000"
    },
    phone: '8899610940',
    whatsapp: '88993651236',
  });

  return clinicRepository as unknown as jest.Mocked<ClinicRepository>;
}