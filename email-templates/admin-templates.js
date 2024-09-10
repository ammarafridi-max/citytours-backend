const transporter = require("../api/index");

async function bookingSuccessfulEmail() {
  const template = {
    from: '"Ammar Afridi" <ammar.afridi95@gmail.com>',
    to: "ammar.afridi952@gmail.com",
    subject: "New Booking",
    text: "A new booking has been successfully made.",
    html: "<b>A new booking has been successfully made.</b>",
  };

  transporter.sendMail(template, (error, info) => {
    if (error) return console.log(error);
    if (info) return console.log(info);
  });
}

module.exports = bookingSuccessfulEmail;
