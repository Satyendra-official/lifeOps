import Habit from '../models/Habit.js';

export const createHabit = async (req, res) => {
  const { name, frequency } = req.body;
  try {
    const habit = await Habit.create({ name, frequency, userId: req.userId });
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHabit = async (req, res) => {
  const { id } = req.params; // Destructure id from params
  // console.log("inside update habit----------", id); 
  // // Now it will log the correct id

  const { name, frequency } = req.body;
  try {
    const updated = await Habit.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name, frequency },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Habit not found' }); // Handle not found
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHabit = async (req, res) => {
  const { id } = req.params;
  try {
    await Habit.findOneAndDelete({ _id: id, userId: req.userId });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  