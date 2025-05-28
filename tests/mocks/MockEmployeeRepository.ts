import { EmployeeRepository } from "../../src/modules/employee/repositories/EmployeeRepository";

export const createEmployeeMockRepository = (): jest.Mocked<EmployeeRepository> => {
  const employeeRepository = new EmployeeRepository({} as any)

  employeeRepository.create = jest.fn().mockResolvedValue({
    id: 123,
    user_id: 123,
    clinic_id: 123,
    name: 'luigi',
    function: 'attendant',
    phone: '88993651236',
  });

  return employeeRepository as unknown as jest.Mocked<EmployeeRepository>;
}