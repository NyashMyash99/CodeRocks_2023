import { OrderModel } from "../models/order.models";

export const MOCK_ORDER_DATA: OrderModel[] = [
  {
    id: "3eea8a6a-a953-40ef-916c-872a00c2bfcd",
    title: "Сварить пельмени",
    description:
      "Мне необходимо в срочном порядке сварить пельмени, подойдёт любой квалифицированный сотрудник.",
    location: "г. Брянск, ул. Пушкина, д. Колотушкина, кв. 3",
    currency: "RUB",
    minPrice: 50,
    maxPrice: 100,
    deadline: 21600000,
    customer: {
      id: "e194ab81-a66f-498e-81e9-35a84d560571",
      email: "test@mail.ru",
      phoneNumber: "+78005553535",
      profile: {
        firstName: "Тест",
        lastName: "Тестович",
        description: "",
      },
    },
    performers: [
      {
        id: "a85c948d-aba6-4525-ba64-bb8b86828898",
        email: "test2@mail.ru",
        phoneNumber: "+78005553535",
        profile: {
          firstName: "Иван",
          lastName: "Борисович",
          description: "",
        },
      },
    ],
  },
  {
    id: "84e96236-836b-480e-9e4a-9756ae9e404a",
    title: "Вычесать кошку",
    description:
      "У меня аллергия на шерсть, но моя кошка должна быть вычесана, ищу человека без аллергии для данной работы.",
    location: "г. Брянск, ул. 22 съезда КПСС, д. 32, кв. 64",
    currency: "USD",
    minPrice: 200,
    maxPrice: 500,
    deadline: 86400000,
    customer: {
      id: "a85c948d-aba6-4525-ba64-bb8b86828898",
      email: "test2@mail.ru",
      phoneNumber: "+78005553535",
      profile: {
        firstName: "Иван",
        lastName: "Борисович",
        description: "",
      },
    },
    performers: [],
  },
];
