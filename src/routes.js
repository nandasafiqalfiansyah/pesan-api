const { addpesan, deletepesan,getpesan } = require("./handler");

const routes = [
  {
    method: `GET`,
    path: `/v1/pesan`,
    handler: getpesan,
  },
  {
    method: `POST`,
    path: `/v1/pesan`,
    handler: addpesan,
  },
  {
    method: `DELETE`,
    path: `/v1/pesan/{id}`,
    handler: deletepesan,
  },
];

module.exports = routes;
