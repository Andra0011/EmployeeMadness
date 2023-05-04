/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const equipmentNames = require("./name.json");
const type = require("./type.json");
const amount = require("./amount.json");
const BrandModel = require("../db/brand.model");
const brand = require("./brands.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  
  let brands = await BrandModel.find({})
  brands = brands.map(brand => brand._id)

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: pick(equipmentNames),
    brand: pick(brands)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipment = equipmentNames.map(() => ({
    name: pick(equipmentNames),
    type: pick(type),
    amount: pick(amount),
  }));

  await EquipmentModel.create(...equipment);
  console.log("Equipment created");
};

const populateBrands = async () => {
  await BrandModel.deleteMany({});

  const brands = brand.map((brandname) => ({
    name: brandname
  }));

  await BrandModel.create(...brands);
  console.log("Brands created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipment();
  
  await populateBrands();

  await populateEmployees();


  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
