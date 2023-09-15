import exception from "../handler/exception.js";

export const qrForm = (req, res, next) => {
  const { qrCode, latitude, longitude } = req.body;
  if(!qrCode) return res.status(exception.QR_EMPTY.statusCode).json(exception.QR_EMPTY);
  else if(!latitude || !longitude) return res.status(exception.LOCATION_EMPTY.statusCode).json(exception.LOCATION_EMPTY);
  next();
}