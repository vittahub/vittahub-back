import { createSpecialistMockRepository } from "../mocks/MockSpecialistRepository";
import { ClinicController } from "../../src/modules/clinic/ClinicController"
import { createClinicMockRepository } from "../mocks/MockClinicRepository"
import { createUserMockRepository } from "../mocks/MockUserRepository"
import bcrypt from "bcryptjs";
import { createEmployeeMockRepository } from "../../tests/mocks/MockEmployeeRepository";

jest.mock('bcryptjs');
jest.mock('../../src/modules/clinic/middleware/ClinicRegisterMapper');

describe('clinic controller', () => {
    const userRepository = createUserMockRepository()
    const clinicRepository = createClinicMockRepository()
    const specialistRepository = createSpecialistMockRepository()
    const employeeRepository = createEmployeeMockRepository()
    const clinicController = new ClinicController(userRepository, clinicRepository, specialistRepository, employeeRepository)

    const clinicRegisterReq = {
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

    const specialistRegisterReq = {
      body: {
        name: 'leon',
        email: 'leon@email.com',
        password: 'MyPassword',
        password_confirmation: 'MyPassword',
        clinic_id: 123,
        role: 'specialist',
        speciality: 'cardiologist',
        phone: '8899610940'
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

    await clinicController.registerClinic(clinicRegisterReq, res);

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

  it('should register a new specialist on the clinic', async() => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status, json } as any;

    await clinicController.registerSpecialist(specialistRegisterReq, res);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('leon@email.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('MyPassword', 10)
    expect(userRepository.create).toHaveBeenCalledWith({
      email: 'leon@email.com',
      password: 'MyHashedPassword',
      role: 'specialist',
    });
    expect(specialistRepository.create).toHaveBeenCalledWith({
      user_id: 123,
      clinic_id: 123,
      name: 'leon',
      speciality: 'cardiologist',
      phone: '8899610940',
    })
  });
})