const origins = ["http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (origins.indexOf(origin) !== -1 || !origin) return callback(null, true);
    return callback(new Error("CAN NOT ACCESS TO SERVER"));
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
