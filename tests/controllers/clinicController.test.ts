import { ClinicController } from "../../src/controllers/ClinicController"
import { createClinicMockRepository } from "../mocks/MockClinicRepository"
import { createUserMockRepository } from "../mocks/MockUserRepository"
import bcrypt from "bcryptjs";

jest.mock('bcryptjs');
jest.mock('../../src/helpers/responseMapping/toClinicRegisterResponse');

describe('clinic controller', () => {
    const userRepository = createUserMockRepository()
    const clinicRepository = createClinicMockRepository()
    const clinicController = new ClinicController(userRepository, clinicRepository)

    const req = {
        body: {
            name: "clinica do jose",
            email: "clinicajose@email.com",
            password: "MyPassword",
            password_confirmation: "MyPassword",
            role: "clinic",
            cnpj: "18848749000159",
            address: {
                street: "R. Jaime Leonel Chaves",
                number: "2134",
                country: "Brazil",
                city: "Limoeiro Do Norte",
                zip_code: "6293000"
            },
            phone: "8899610940",
            whatsapp: "88993651236",
        } 
    } as any

    beforeEach(() => {
        jest.clearAllMocks();
        (bcrypt.hash as jest.Mock).mockResolvedValue("MyHashedPassword");
    });

  it('should successfuly register a clinic', async() => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status, json } as any;

    await clinicController.registerClinic(req, res);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('clinicajose@email.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('MyPassword', 10)
    expect(userRepository.create).toHaveBeenCalledWith({
      email: 'clinicajose@email.com',
      password: 'MyHashedPassword',
      role: 'clinic',
    });
    expect(clinicRepository.create).toHaveBeenCalledWith({
      user_id: 123,
      name: "clinica do jose",
      cnpj: "18848749000159",
      address: {
        street: "R. Jaime Leonel Chaves",
        number: "2134",
        country: "Brazil",
        city: "Limoeiro Do Norte",
        zip_code: "6293000"
      },
      phone: "8899610940",
      whatsapp: "88993651236",
    });
  }); 
})