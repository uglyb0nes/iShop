const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);

  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', (req, res) => {
  try {
    const exists = await Tag.findByPk(req.params.id);
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!exists) {
      res.status(404).json( { error: "No tag found with that ID." });
      return;
    }
    res.status(200).json(updatedTag);

  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const exists = await Tag.findByPk(req.params.id);
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!exists) {
      res.status(404).json( { error: "No tag found with that ID." });
      return;
    }
    res.status(200).json(deletedTag);

  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
