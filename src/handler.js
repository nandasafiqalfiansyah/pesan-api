const { nanoid } = require("nanoid");
const data_pesans = require("./pesan");

const addpesan = (request, h) => {
  const id = nanoid(16);
  const { pesan } = request.payload;
  const date = new Date;
  const day =  date.getDay();
  const tgl = date.getDate();
  const jam = date.getHours();
  const menit = date.getMinutes();
  const detik = date.getSeconds();
  const nameday = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];
  const hari =tgl+" "+ nameday[day] +" "+`${jam}:${menit}:${detik}`;

  console.log(pesan)
  const newPesan = {
    id,
    pesan,
    hari 
  };
  data_pesans.push(newPesan);
  const isSuccess = data_pesans.some((data_pesan) => data_pesan.id === id);
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "pesan berhasil ditambahkan",
      data: {
        dataId: id,
        pesan,
        hari 
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "pesan gagal ditambahkan",
  });
  response.code(500);
  return response;
};
const getpesan = (request, h) => {
  if (data_pesans.length === 0) {
    const response = h.response({
      status: "404",
      message: "pesan tidak ada",
    }).code(404); // Mengubah kode status ke 404
    return response;
  } else {
    return h.response(data_pesans).code(200);
  }
};
const deletepesan = (request, h) => {
  const { id } = request.params;
  const index = data_pesans.findIndex((data_pesan) => data_pesan.id === id);
  if (index !== -1) {
    data_pesans.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "pesan berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "pesan gagal dihapus",
  });
  response.code(404);
  return response;
};

module.exports = { addpesan, deletepesan, getpesan };
