const Joi = require("joi");

const listingsSchema = Joi.object(
    {
  listing: Joi.object(
    {
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
      image: Joi.alternatives().try(
        Joi.object({
          url: Joi.string().uri().allow(""),
          filename: Joi.string().allow("")
        }),
        Joi.string().uri().allow("")
    )
  }).required()
});

module.exports = { listingsSchema };


module.exports.reviewSchema = Joi.object(
  {
    review: Joi.object({
      Comment: Joi.string().allow(""),
      Rating: Joi.number().required().min(1).max(5)
    }).required()
  }
);
