import { PatientController } from "../../src/modules/patient/PatientController";
import bcrypt from "bcryptjs";
import { createPatientMockRepository } from "../mocks/MockPatientRepository";
import { createUserMockRepository } from "../mocks/MockUserRepository";


jest.mock('bcryptjs');
jest.mock('../../src/modules/patient/middleware/PatientRegisterMapper');

describe('patient controller', () => {
  const userRepository = createUserMockRepository();
  const patientRepository = createPatientMockRepository();
  const patientController = new PatientController(userRepository, patientRepository);

  const req = {
    body: {
      name: "jose",
      email: "jose@email.com",
      password: "MyPassword",
      password_confirmation: "MyPassword",
      role: "patient",
      birthdate: "2001-11-05",
      sex: "male",
      address: {
        street: "R. Jaime Leonel Chaves",
        number: "2134",
        country: "Brazil",
        city: "Limoeiro Do Norte",
        zip_code: "6293000"
      },
      phone_1: "88996610940",
      phone_2: "88996610940",
      cpf: "58411819972",
    },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    (bcrypt.hash as jest.Mock).mockResolvedValue("MyHashedPassword");
  });

  it('should successfuly register patient', async() => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status, json } as any;

    await patientController.registerPatient(req, res);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('jose@email.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('MyPassword', 10)
    expect(userRepository.create).toHaveBeenCalledWith({
      email: 'jose@email.com',
      password: 'MyHashedPassword',
      role: 'patient',
    });
    expect(patientRepository.create).toHaveBeenCalledWith({
      user_id: 123,
      name: "jose",
      birthdate: "2001-11-05",
      sex: "male",
      address: {
        street: "R. Jaime Leonel Chaves",
        number: "2134",
        country: "Brazil",
        city: "Limoeiro Do Norte",
        zip_code: "6293000"
      },
      phone_1: "88996610940",
      phone_2: "88996610940",
      cpf: "58411819972"
    });
  });
});