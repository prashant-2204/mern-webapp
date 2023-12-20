const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();

    if (!response) {
      // Handle the case where no document was found
      res.status(404).json({ msg: "No service found" });
      return;
    }

    return res.status(200).json({ msg: "Service found", data: response });
  } catch (error) {
    console.log(`Error from the server: ${error}`);
  }
};
module.exports = services;
