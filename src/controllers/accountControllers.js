const db = require("../../models");

createCustomer = async (req, res) => {
  console.log(req.body);
  const { name, api_key } = req.body;
  try {
    const customer = await db.Customer.create({
      name,
      api_key,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCompany = async (req, res) => {
  try {
    const { name, customerId } = req.body;

    const customer = await db.Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const company = await db.Company.create({
      name,
      CustomerId: customerId,
    });
    const companyDetails = await db.Company.findByPk(company.id, {
      include: [db.Customer],
      attributes: { exclude: ["CustomerId"] },
    });
    res.status(201).json(companyDetails);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCustomer,
  createCompany,
};
