import { PatientController } from "../../../src/modules/patient/PatientController";
import { createPatientMockRepository } from "./mock/MockPatientRepository";
import { createUserServiceMock } from "../../shared/mock/MockEntityCreation";
import toPatientRegisterResponse from "../../../src/modules/patient/middleware/PatientRegisterMapper";

describe('patient controller', () => {
  const patientRepository = createPatientMockRepository();
  const userService = createUserServiceMock();
  const patientController = new PatientController(userService, patientRepository);

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

  it('should successfuly register patient', async() => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status, json } as any;

    await patientController.registerPatient(req, res);

    expect(userService.CreateWithUser).toHaveBeenCalledWith(
      req.body.email,
      req.body.password,
      req.body.role,
      expect.any(Function),
      toPatientRegisterResponse,
      res
    );
  });
});