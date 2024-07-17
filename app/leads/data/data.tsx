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
