import { IWorkResource } from "../../entities/IWorkResource";

const WORK_RESOURCES: IWorkResource[] = [
  {
    label: "Favourites",
    description:
      "Quickly access your favorite work resources for easy viewing.",
    image: require("../../../assets/favourites.png"),
  },
  {
    label: "Employee Rights",
    description:
      "Understand employer obligations regarding long COVID accommodations and workplace safety.",
    image: require("../../../assets/employer-rights.png"),
  },
  {
    label: "Employer Rights",
    description:
      "Learn about rights regarding accommodations, discrimination protection, and workplace safety.",
    image: require("../../../assets/employee-rights.png"),
  },
  {
    label: "Workplace Adjustments",
    description:
      "Discover ways to modify the workplace to accommodate employees with long COVID.",
    image: require("../../../assets/workplace-adjustments.jpg"),
  },
  {
    label: "Disibility Entitlements",
    description:
      "Explore benefits and entitlements available to individuals with long COVID-related disabilities.",
    image: require("../../../assets/disability-entitlements.jpg"),
  },
  {
    label: "Mental Health Support",
    description:
      "Find resources and guidance for coping with mental health challenges related to long COVID.",
    image: require("../../../assets/mental-health-support.jpg"),
  },
  {
    label: "Financial Support",
    description:
      "Access information on financial assistance available for individuals affected by long COVID.",
    image: require("../../../assets/financial-support.png"),
  },
];

export const UI = {
  WORK_RESOURCES: WORK_RESOURCES,
};
