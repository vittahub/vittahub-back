import { MockQueryBuilder } from "./MockQueryBuilder";

export const createPatientMockKnex = (): { patientDb: jest.Mock; patientBuilder: MockQueryBuilder } => {
  const patientBuilder: MockQueryBuilder = {
    insert: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([
      {
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
      },
    ]),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue(
      {
        id: 123,
        user_id: 123,
        name: 'jose',
        birthdate: '2001-11-05',
        sex: 'male',
        address: {
          "street": "R. Jaime Leonel Chaves",
          "number": "2134",
          "country": "Brazil",
          "city": "Limoeiro Do Norte",
          "zip_code": "6293000"
        },
        phone_1: '8899610940',
        phone_2: '88993651236',
        cpf: '36938081042'
      }
    ),
    select: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    del: jest.fn().mockResolvedValue(1),
  };

  const patientDb = jest.fn(() => patientBuilder);
  return { patientDb, patientBuilder };
};