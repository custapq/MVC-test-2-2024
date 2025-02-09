const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const costumeController = require("./routes/costumeRoute");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); // กำหนดให้ใช้ ejs เป็น view engine
app.set("views", "./views"); // กำหนด path ของ view
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.json()); // กำหนดให้ใช้ json ในการรับ request
app.use("/", costumeController); // กำหนด route ที่จะใช้ในโปรแกรมนี้้

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
