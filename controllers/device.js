const Device = require("../models/Device");
const getProject = require("../helper/project");

exports.getDeviceController = async (req, res) => {
  try {
    const device_id = req.params.id;
    let device = await Device.findOne({ _id: device_id });
    res.json({ device });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.getDevicesController = async (req, res) => {
  try {
    let project_id = req.query.project_id;
    let devices = await Device.find({ project_id });
    res.json({ devices });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.addDeviceController = async (req, res) => {
  /*
   name
   project_id **project Id will be extracted from user_id.(token-> user id)
   purpose
   mqttId
   mqttPassword
   data[array]
   */
  try {
    const { name, purpose, projectId } = req.body;
    let project = await getProject.getProjectID(req.user.id);
    let project_id = project._id;

    let device = new Device({
      name: name,
      project_id: projectId,
      purpose: purpose,
      mqttId: "1234567",
      mqttPassword: "1234567",
      data: [],
    });
    let savedDevice = await device.save();
    res.json({ savedDevice });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.editDeviceController = async (req, res) => {
  try {
    const { name, purpose } = req.body;
    let device_id = req.params.id;
    let device = await Device.findByIdAndUpdate(
      { _id: device_id },
      { name: name, purpose: purpose }
    );
    res.json({ device });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.deleteDeviceController = async (req, res) => {
  try {
    let device_id = req.params.id;
    let device = await Device.findByIdAndDelete({ _id: device_id });
    res.json({ device });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
