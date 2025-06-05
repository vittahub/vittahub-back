import { createSpecialistMockRepository } from "../specialist/mock/MockSpecialistRepository";
import { ClinicController } from "../../../src/modules/clinic/ClinicController"
import { createClinicMockRepository } from "./mock/MockClinicRepository"
import { createEmployeeMockRepository } from "../employee/mock/MockEmployeeRepository";
import { createUserServiceMock } from "../../shared/mock/MockEntityCreation";
import toClinicRegisterResponse from "../../../src/modules/clinic/middleware/ClinicRegisterMapper";
import toSpecialistRegisterResponse from "../../../src/modules/specialist/middleware/SpecialistRegisterMapper";

describe('clinic controller', () => {
    const userService = createUserServiceMock()
    const clinicRepository = createClinicMockRepository()
    const specialistRepository = createSpecialistMockRepository()
    const employeeRepository = createEmployeeMockRepository()
    const clinicController = new ClinicController(userService, clinicRepository, specialistRepository, employeeRepository)

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

  it('should successfuly register a clinic', async() => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status, json } as any;

    await clinicController.registerClinic(clinicRegisterReq, res);

    expect(userService.CreateWithUser).toHaveBeenCalledWith(
      clinicRegisterReq.body.email,
      clinicRegisterReq.body.password,
      clinicRegisterReq.body.role,
      expect.any(Function),
      toClinicRegisterResponse,
      res)
  }); 

  it('should register a new specialist on the clinic', async() => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status, json } as any;

    await clinicController.registerSpecialist(specialistRegisterReq, res);

    expect(userService.CreateWithUser).toHaveBeenCalledWith(
      specialistRegisterReq.body.email,
      specialistRegisterReq.body.password,
      specialistRegisterReq.body.role,
      expect.any(Function),
      toSpecialistRegisterResponse,
      res);
  });

})