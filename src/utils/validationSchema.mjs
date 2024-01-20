export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 35,
      },
      errorMessage:
        "username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "username can not be empty",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "displayName can not be empty",
    },
  },
};
