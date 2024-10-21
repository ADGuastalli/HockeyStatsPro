// src/services/clubesService.js
const { Clubes } = require("../models");

const getAllClubs = async () => {
  return await Clubes.findAll();
};

const createClub = async (clubData) => {
  return await Clubes.create(clubData);
};

const deleteClub = async (id) => {
  return await Clubes.destroy({ where: { id } });
};

module.exports = {
  getAllClubs,
  createClub,
  deleteClub,
};
