const getPartSchema = require("../../../../joi-schemas/part");
const { getUpdateOrderSchema } = require("../../../../joi-schemas/request");

module.exports = async (ctx, next) => {
  const { squares, classes, parts, categories } = strapi.config.params;

  const partsLastIndex = parts.length - 1;
  const squaresLastIndex = squares.length - 1;
  const classesLastIndex = classes.length - 1;
  const categoriesLastIndex = categories.length - 1;

  const itemSchema = getPartSchema({
    partsLastIndex,
    squaresLastIndex,
    categoriesLastIndex
  });
  const requestSchema = getUpdateOrderSchema({ classesLastIndex, itemSchema });

  try {
    await requestSchema.validateAsync(ctx.request.body);
    await next();
  } catch (err) {
    if (err.isJoi)
      return ctx.response.badRequest(err.details.map(e => e.message));
    return ctx.throw();
  }
};
