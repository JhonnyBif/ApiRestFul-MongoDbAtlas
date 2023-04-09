const router = require("express").Router();
const Person = require("../models/person");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    return res.status(422).json({ error: "Name is required" });
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);

    res.status(201).json({ message: "Person created successfully" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      return res.status(422).json({ Message: "Id not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);
    if (updatePerson.matchedCount === 0) {
      return res.status(422).json({ Message: "User not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });
  if (!person) {
    return res.status(422).json({ Message: "Id not found" });
  }
  try {
    await Person.deleteOne({ _id: id });

    res.status(422).json({ Message: "Person delete successfully" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = router;
