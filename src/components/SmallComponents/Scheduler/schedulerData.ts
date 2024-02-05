import {
  DefaultRecourse,
  FieldProps,
  ResourceFields,
} from "@aldabil/react-scheduler/types";
import { DayProps } from "@aldabil/react-scheduler/views/Day";
import { MonthProps } from "@aldabil/react-scheduler/views/Month";
import { WeekProps } from "@aldabil/react-scheduler/views/Week";

export const MONTH: MonthProps = {
  weekDays: [2, 3, 4, 5, 6, 0, 1],
  weekStartOn: 6,
  startHour: 9,
  endHour: 21,
};

export const WEEK: WeekProps = {
  weekDays: [2, 3, 4, 5, 6, 0, 1],
  weekStartOn: 6,
  startHour: 9,
  endHour: 21,
  step: 60,
};

export const DAY: DayProps = {
  startHour: 9,
  endHour: 21,
  step: 60,
};

export const RESOURCE_FIELDS: ResourceFields = {
  idField: "client_id",
  textField: "title",
  avatarField: "avatar",
  colorField: "color",
  treatment: "treatment",
  note: "note",
};

export const FIELDS = (resources: DefaultRecourse[]): FieldProps[] => {
  return [
    {
      name: "client_id",
      type: "select",
      default: resources[0]?.client_id,
      options: resources.map((res) => {
        return {
          id: res.client_id,
          text: res.title,
          value: res.client_id,
        };
      }),
      config: { label: "Клиент", required: true },
    },
  ];
};

export const TREATMENT_OPTIONS = [
  {
    title: "Класически маникюр без лак (30 Мин)",
    value: "Класически маникюр без лак (30 Мин)",
    duration: 30,
  },
  {
    title: "Маникюр с гел лак (90мин)",
    value: "Маникюр с гел лак (90мин)",
    duration: 90,
  },
  {
    title: "Маникюр с обикновен лак (45 Мин)",
    value: "Маникюр с обикновен лак (45 Мин)",
    duration: 45,
  },
  {
    title: "Мъжки маникюр (30 Мин)",
    value: "Мъжки маникюр (30 Мин)",
    duration: 30,
  },
  {
    title: "Укрепване на един нокът (5 Мин)",
    value: "Укрепване на един нокът (5 Мин)",
    duration: 5,
  },
  {
    title: "Гел на естествен къси/дълги (2 ч)",
    value: "Гел на естествен къси/дълги (2 ч)",
    duration: 120,
  },
  {
    title: "Френски маникюр и омбре (15 Мин)",
    value: "Френски маникюр и омбре (15 Мин)",
    duration: 15,
  },
  {
    title: "Дизайнерска декорация (15 Мин)",
    value: "Дизайнерска декорация (15 Мин)",
    duration: 15,
  },
  {
    title: "Малки декорации (10 Мин)",
    value: "Малки декорации (10 Мин)",
    duration: 10,
  },
  {
    title: "Премахване на гел лак (10 Мин)",
    value: "Премахване на гел лак (10 Мин)",
    duration: 10,
  },
  {
    title: "Спа терапия маникюр (10мин)",
    value: "Спа терапия маникюр (10мин)",
    duration: 10,
  },
  {
    title: "Класически педикюр без лак (45мин)",
    value: "Класически педикюр без лак (45мин)",
    duration: 45,
  },
  {
    title: "Педикюр с гел лак (90мин)",
    value: "Педикюр с гел лак (90мин)",
    duration: 90,
  },
  {
    title: "Педикюр с обикновен лак (60мин)",
    value: "Педикюр с обикновен лак (60мин)",
    duration: 60,
  },
  {
    title: "Бърз педикюр (50 Мин)",
    value: "Бърз педикюр (50 Мин)",
    duration: 50,
  },
  {
    title: "Мъжки педикюр (50 Мин)",
    value: "Мъжки педикюр (50 Мин)",
    duration: 50,
  },
  {
    title: "Спа терапия педикюр (10 Мин)",
    value: "Спа терапия педикюр (10 Мин)",
    duration: 10,
  },
  {
    title: "Изграждане на къси нокти (2 часа)",
    value: "Изграждане на къси нокти (2 часа)",
    duration: 120,
  },
  {
    title: "Изграждане на дълги нокти (3 часа)",
    value: "Изграждане на дълги нокти (3 часа)",
    duration: 180,
  },
  {
    title: "Поддръжка на изградени нокти (2 часа)",
    value: "Поддръжка на изградени нокти (2 часа)",
    duration: 120,
  },
  {
    title: "Изграждане на един нокът (5 Мин)",
    value: "Изграждане на един нокът (5 Мин)",
    duration: 5,
  },
  {
    title: "Премахване на ноктопластика (15 Мин)",
    value: "Премахване на ноктопластика (15 Мин)",
    duration: 15,
  },
  {
    title: "Пакет маникюр и педикюр с гел лак (3ч)",
    value: "Пакет маникюр и педикюр с гел лак (3ч)",
    duration: 180,
  },
  {
    title: "Спа терапия 3+1 (10 Мин)",
    value: "Спа терапия 3+1 (10 Мин)",
    duration: 10,
  },
];
