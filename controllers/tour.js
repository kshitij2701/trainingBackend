import TourModal from "../models/tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  console.log(req.body);
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newTour.save();
    res.status(200).json(newTour);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong!." });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await TourModal.find();
    res.status(200).json(tours);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!." });
  }
};