const db = require("../../models");
const { Sequelize } = require("sequelize");

const getVehicleVisitReport = async (req, res) => {
  try {
    // const { fromDate, toDate } = req.body;
    const fromDate = new Date("2024-03-01");
    const toDate = new Date("2024-03-31");

    const vehicleVisits = await db.VehicleVisit.findAll({
      where: {
        date_time: {
          [Sequelize.Op.between]: [fromDate, toDate],
        },
      },
      order: [["date_time", "DESC"]],
      include: [
        {
          model: db.Gate,
        },
        {
          model: db.Vehicle,
        },
        "visitImages",
      ],
      attributes: {
        exclude: ["GateId", "VehicleId"], // Exclude GateId and VehicleId
      },
    });

    res.json(vehicleVisits);
  } catch (error) {
    // Handle errors
    console.error("Error fetching vehicle visit report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDetailedVehicleVisitReport = async (req, res) => {
  try {
    // const { fromDate, toDate } = req.body;
    const fromDate = new Date("2024-03-01");
    const toDate = new Date("2024-04-04");

    const vehicleVisits = await db.VehicleVisit.findAll({
      where: {
        date_time: {
          [Sequelize.Op.between]: [fromDate, toDate],
        },
      },
      order: [["date_time", "DESC"]],
      include: [
        {
          model: db.Gate,
        },
        {
          model: db.Vehicle,
        },
        "visitImages",
      ],
    });
    const visitsCopy = vehicleVisits;
    combinedVisits = [];
    for (let visit of vehicleVisits) {
      console.log("vehicle visit", visit.vehicle);
      combinedVisit = {};
      if (visit.visit_type == "entry") {
        let filteredExitVisits = vehicleVisits.filter(
          (v) =>
            v.visit_type == "exit" &&
            v.VehicleId == visit.VehicleId &&
            v.date_time > visit.date_time
        );
        if (filteredExitVisits.length > 0) {
          filteredExitVisits.sort((a, b) => {
            const dateA = new Date(a.date_time);
            const dateB = new Date(b.date_time);
            return dateA - dateB;
          });
          let next_exit_visit = filteredExitVisits[0];
          let filteredEntryVisits = vehicleVisits.filter(
            (v) =>
              v.visit_type == "entry" &&
              v.VehicleId == visit.VehicleId &&
              v.date_time < next_exit_visit.date_time &&
              v.date_time > visit.date_time
          );
          if (filteredEntryVisits.length > 0) {
            next_exit_visit = null;
          }

          combinedVisit.vehicle = visit.Vehicle;
          combinedVisit.entryDateTime = visit.date_time;
          combinedVisit.exitDateTime = next_exit_visit
            ? next_exit_visit.date_time
            : null;
          combinedVisit.gate = visit.Gate;
          combinedVisit.visitImages = visit.visitImages.map(
            (image) => image.image_url
          );

          const index1 = visitsCopy.indexOf(next_exit_visit);
          if (index1 > -1) {
            visitsCopy.splice(index1, 1);
          }
          const index2 = visitsCopy.indexOf(visit);
          if (index2 > -1) {
            visitsCopy.splice(index2, 1);
          }

          combinedVisits.push(combinedVisit);
        } else {
          console.log("else");
          combinedVisit.vehicle = visit.Vehicle;
          combinedVisit.entryDateTime = visit.date_time;
          combinedVisit.exitDateTime = null;
          combinedVisit.gate = visit.Gate;
          combinedVisit.visitImages = visit.visitImages.map(
            (image) => image.image_url
          );
          const index2 = visitsCopy.indexOf(visit);
          if (index2 > -1) {
            visitsCopy.splice(index2, 1);
          }
          combinedVisits.push(combinedVisit);
        }
      }
    }
    if (visitsCopy.length > 0) {
      let combinedVisit = {};
      for (let visit of visitsCopy) {
        combinedVisit.vehicle = visit.Vehicle;
        combinedVisit.entryDateTime = null;
        combinedVisit.exitDateTime = visit.date_time;
        combinedVisit.gate = visit.Gate;
        combinedVisit.visitImages = visit.visitImages.map(
          (image) => image.image_url
        );
        combinedVisits.push(combinedVisit);
      }
    }
    res.json(combinedVisits);
  } catch (error) {
    console.error("Error fetching vehicle visit report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createGate = async (req, res) => {
  try {
    const { name, gateType, companyId } = req.body;

    const company = await db.Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const gate = await db.Gate.create({
      name,
      gate_type: gateType,
      CompanyId: companyId,
    });

    const gateDetails = await db.Gate.findByPk(gate.id, {
      include: [
        {
          model: db.Company,
          include: [db.Customer],
          attributes: { exclude: ["CustomerId"] },
        },
      ],
      attributes: { exclude: ["CompanyId"] },
    });
    res.status(201).json({
      gate: gateDetails,
      message: "Gate created successfully",
    });
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
    const { dateTime, gateId, vehicleId } = req.body;

    const gate = await db.Gate.findByPk(gateId);
    const vehicle = await db.Vehicle.findByPk(vehicleId);

    if (!gate || !vehicle) {
      return res.status(404).json({ error: "Gate or vehicle not found" });
    }

    const vehicleVisit = await db.VehicleVisit.create({
      visit_type: visitType,
      date_time: dateTime,
      GateId: gateId,
      VehicleId: vehicleId,
    });

    res.status(201).json(vehicleVisit);
  } catch (error) {
    console.error("Error creating vehicle visit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createVisitImage = async (req, res) => {
  try {
    const { imageType, imagePath, vehicleVisitId } = req.body;

    const vehicleVisit = await db.VehicleVisit.findByPk(vehicleVisitId);
    if (!vehicleVisit) {
      return res.status(404).json({ error: "Vehicle Visit not found" });
    }

    const gate = await db.Gate.findByPk(gateId, {
      include: [{ model: db.Company }],
    });
    const visitImage = await db.VisitImage.create({
      image_type: imageType,
      image_path: imagePath,
      VehicleVisitId: vehicleVisitId,
    });

    res.status(201).json(visitImage);
  } catch (error) {
    console.error("Error creating VisitImage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createDetailedVehicleVisit = async (req, res) => {
  try {
    const { dateTime, gateId, companyId, plateNumber, vehicleType } = req.body;
    // const parsedDateTime = new Date(dateTime);
    const parsedDateTime = new Date();
    const gate = await db.Gate.findByPk(gateId);
    const company = await db.Company.findByPk(companyId);

    if (gate.gate_type == "entry") {
      visitType = "entry";
    } else if (gate.gate_type == "exit") {
      visitType = "exit";
    } else {
      visitType = "unknown";
    }

    const [vehicle, created] = await db.Vehicle.findOrCreate({
      where: { plate_number: plateNumber },
      defaults: { vehicle_type: vehicleType, CompanyId: company.id },
    });

    const vehicleVisit = await db.VehicleVisit.create({
      visit_type: visitType,
      date_time: parsedDateTime,
      GateId: gate.id,
      VehicleId: vehicle.id,
    });

    const fullVehicleVisit = await db.VehicleVisit.findByPk(vehicleVisit.id, {
      include: [db.Gate, db.Vehicle],
    });

    res.status(200).json({
      message: "Vehicle visit created successfully",
      vehicleVisit: fullVehicleVisit,
    });
  } catch (error) {
    console.error("Error creating vehicle visit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getVehicleVisitReport,
  createGate,
  createVehicle,
  createVehicleVisit,
  createVisitImage,
  createDetailedVehicleVisit,
  getDetailedVehicleVisitReport,
};
