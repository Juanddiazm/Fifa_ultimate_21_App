import { object, string, number, ref } from "yup";

const pageCondition = number()
  .integer("Page must be an integer")
  .positive("Page must be a positive number");

const payload = {
  body: object({
    Name: string().required("Team name is required"),
    Page: pageCondition,
  }),
};

const query = {
  query: object({
    order: string().matches(/(^asc$|^desc$)/, {
      message: "Invalid order must be asc or desc",
      excludeEmptyString: true,
    }),
    page: pageCondition,
  }),
};

export const findPlayerByTeamNameSchema = object({
  ...payload,
});

export const findPlayerByNameSchema = object({
  ...query,
});
