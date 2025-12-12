const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const WEATHER_TYPES = ["hot", "warm", "cold"];
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 6;
const ITEM_ID_LENGTH = 24;


const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItemCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(NAME_MIN_LENGTH)
      .max(NAME_MAX_LENGTH)
      .required()
      .messages({
        "string.min": `The "name" field must be at least ${NAME_MIN_LENGTH} characters long`,
        "string.max": `The "name" field must be at most ${NAME_MAX_LENGTH} characters long`,
        "string.empty": 'The "name" field must be filled',
      }),
    weather: Joi.string()
      .valid(...WEATHER_TYPES)
      .required()
      .messages({
        "string.empty": 'The "weather" field must be filled',
        "any.only":
          'The "weather" field must be one of the following values: hot, warm, cold',
      }),
    imageUrl: Joi.string().custom(validateURL).required().messages({
      "string.empty": 'The "imageUrl" field must be filled',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

const validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(NAME_MIN_LENGTH)
      .max(NAME_MAX_LENGTH)
      .required()
      .messages({
        "string.min": `The "name" field must be at least ${NAME_MIN_LENGTH} characters long`,
        "string.max": `The "name" field must be at most ${NAME_MAX_LENGTH} characters long`,
        "string.empty": 'The "name" field must be filled',
      }),
    email: Joi.string().email().required().messages({
      "string.empty": 'The "email" field must be filled',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .min(PASSWORD_MIN_LENGTH)
      .required()
      .messages({
        "string.empty": 'The "password" field must be filled',
        "string.min": `The "password" field must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      }),
  }),
});
const createIdValidator = (paramName) =>
  celebrate({
    params: Joi.object().keys({
      [paramName]: Joi.string()
        .hex()
        .length(ITEM_ID_LENGTH)
        .required()
        .messages({
          "string.length": `The "${paramName}" parameter must be ${ITEM_ID_LENGTH} characters long`,
          "string.hex": `The "${paramName}" parameter must be a valid hexadecimal string`,
        }),
    }),
  });

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(NAME_MIN_LENGTH)
      .max(NAME_MAX_LENGTH)
      .required()
      .messages({
        "string.min": `The "name" field must be at least ${NAME_MIN_LENGTH} characters long`,
        "string.max": `The "name" field must be at most ${NAME_MAX_LENGTH} characters long`,
        "string.empty": 'The "name" field must be filled',
      }),
    avatar: Joi.string().custom(validateURL).required().messages({
      "string.empty": 'The "avatar" field must be filled',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().email().required().messages({
      "string.empty": 'The "email" field must be filled',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .min(PASSWORD_MIN_LENGTH)
      .required()
      .messages({
        "string.empty": 'The "password" field must be filled',
        "string.min": `The "password" field must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(NAME_MIN_LENGTH)
      .max(NAME_MAX_LENGTH)
      .messages({
        "string.min": `The "name" field must be at least ${NAME_MIN_LENGTH} characters long`,
        "string.max": `The "name" field must be at most ${NAME_MAX_LENGTH} characters long`,
        "string.empty": 'The "name" field must be filled',
      }),
    avatar: Joi.string().custom(validateURL).optional().messages({
      "string.empty": 'The "avatar" field must be filled',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});

const authenticateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.empty": 'The "email" field must be filled',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .min(PASSWORD_MIN_LENGTH)
      .required()
      .messages({
        "string.empty": 'The "password" field must be filled',
        "string.min": `The "password" field must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      }),
  }),
});

const validateItemIdParam = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string()
      .hex()
      .length(ITEM_ID_LENGTH)
      .required()
      .messages({
        "string.length": `The "itemId" parameter must be ${ITEM_ID_LENGTH} characters long`,
        "string.hex":
          'The "itemId" parameter must be a valid hexadecimal string',
        "string.empty": 'The "itemId" parameter must be filled',
      }),
  }),
});



const validateUserIdParam = createIdValidator("userId");

module.exports = {
  validateClothingItemCreation,
  validateUserInfo,
  authenticateUser,
  validateItemIdParam,
  validateURL,
  validateUserCreation,
  validateUserUpdate,
  validateUserIdParam,
};
