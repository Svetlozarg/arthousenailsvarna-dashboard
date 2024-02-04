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
