//dependencies
//var cloudinary = require('cloudinary').v2;
const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const session = require("express-session");
const helpers = require("./utils/helpers");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

app.use(routes);
app.use(require("./controllers/"));

const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

//const helpers = require("./utils/helpers");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
