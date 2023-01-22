async function categoryExists(str, id, model) {
    const categoryExists = await model.findOne({ name: str, user: id });
    if (categoryExists) {
      return;
    } else {
      const newCategory = new model({ name: str });
      newCategory.user = id;
      newCategory.save();
    }
  }
module.exports = categoryExists  