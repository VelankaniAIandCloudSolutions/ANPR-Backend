const db = require("../../models");

const getVehicleVisitReport = async (req, res) => {
  try {
    // Extract fromDate and toDate from request query
    const { fromDate, toDate } = req.query;

    // Validate dates if needed
    // For simplicity, let's assume fromDate and toDate are in ISO date format ('YYYY-MM-DD')

    // Fetch the vehicle visit records within the date range
    const vehicleVisits = await VehicleVisit.findAll({
      where: {
        vehicle_id: req.params.vehicleId, // Assuming you're passing vehicleId as a URL parameter
        visit_date: {
          [Sequelize.Op.between]: [fromDate, toDate], // Filter by visit_date within the date range
        },
      },
      order: [["visit_date", "DESC"]], // Order by visit_date in descending order
    });

    // You can further process the vehicleVisits data, format it, or send it directly
    // For now, let's just send it as a JSON response
    res.json(vehicleVisits);
  } catch (error) {
    // Handle errors
    console.error("Error fetching vehicle visit report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createGate = async (req, res) => {
  try {
    // Extract gate data from request body
    const { name, gateType, companyId } = req.body;

    // Check if the companyId exists
    const company = await db.Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Create the gate associated with the company
    const gate = await db.Gate.create({
      name,
      gate_type: gateType,
      CompanyId: companyId, // Assign the gate to the specified company
    });

    res.status(201).json(gate);
  } catch (error) {
    console.error("Error creating gate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createVehicle = async (req, res) => {
  try {
    const { plateNumber, vehicleType, companyId } = req.body;

    const company = await db.Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const vehicle = await db.Vehicle.create({
      plate_number: plateNumber,
      vehicle_type: vehicleType,
      CompanyId: companyId,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createVehicleVisit = async (req, res) => {
  try {
    // Extract vehicle visit data from request body
    const { visitType, dateTime, gateId, vehicleId } = req.body;

    // Check if the gateId and vehicleId exist
    const gate = await db.Gate.findByPk(gateId);
    const vehicle = await db.Vehicle.findByPk(vehicleId);
    if (!gate || !vehicle) {
      return res.status(404).json({ error: "Gate or vehicle not found" });
    }

    // Create the vehicle visit associated with the gate and vehicle
    const vehicleVisit = await db.VehicleVisit.create({
      visit_type: visitType,
      date_time: dateTime,
      GateId: gateId, // Assign the vehicle visit to the specified gate
      VehicleId: vehicleId, // Assign the vehicle visit to the specified vehicle
    });

    res.status(201).json(vehicleVisit);
  } catch (error) {
    console.error("Error creating vehicle visit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createVisitImage = async (req, res) => {
  try {
    // Extract VisitImage data from request body
    const { imageType, imagePath, vehicleVisitId } = req.body;

    // Check if the vehicleVisitId exists
    const vehicleVisit = await db.VehicleVisit.findByPk(vehicleVisitId);
    if (!vehicleVisit) {
      return res.status(404).json({ error: "Vehicle Visit not found" });
    }

    // Create the VisitImage associated with the VehicleVisit
    const visitImage = await db.VisitImage.create({
      image_type: imageType,
      image_path: imagePath,
      VehicleVisitId: vehicleVisitId, // Assign the VisitImage to the specified VehicleVisit
    });

    res.status(201).json(visitImage);
  } catch (error) {
    console.error("Error creating VisitImage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getVehicleVisitReport,
  createGate,
  createVehicle,
  createVehicleVisit,
  createVisitImage,
};
