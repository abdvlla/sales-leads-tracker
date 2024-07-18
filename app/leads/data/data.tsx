import {
  CheckIcon,
  Cross2Icon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "viable",
    label: "Viable",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "successful",
    label: "Successful",
    icon: CheckIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: Cross2Icon,
  },
];

export const responsibles = [
  {
    value: "craig",
    label: "Craig",
  },
  {
    value: "katie",
    label: "Katie",
  },
  {
    value: "mark",
    label: "Mark",
  },
];
