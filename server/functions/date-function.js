const currentDate = () => {
  const { format } = require("date-fns");
  const date = new Date();
  return format(date, "yyyy MMM dd / h:mm a");
};

module.exports = currentDate;
