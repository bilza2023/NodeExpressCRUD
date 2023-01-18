require('dotenv').config();
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................

const  express  =require('express');
const cors = require('cors');
const path = require('path');
// const multer = require('multer');

const PORT = process.env.PORT || 80;
const migration = require('./database/migration.js');
const apiRouter = require('./routes/apiRouter');
const pagesRouter = require('./routes/pagesRouter');
const devRouter = require('./routes/pagesRouter');

const {sqliteDb,BusinessType} = require('./sqliteDb/sqliteDb');

// const regionsController = require('./controllers/regionsController');

// const businessController = require('./controllers/businessesController');
const registerbusinessController = require('./controllers/registerbusinessController');

const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
////////////////////////////////////////////////////
const app = express()

// app.use(cors({origin:'https://localhost'}));
app.use(cors({origin: process.env.HOME_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/",pagesRouter);
app.use("/api",apiRouter);
app.use("/dev",devRouter);

/////////////////////////////////////
app.use(cookieParser());
//.. static files
app.use(express.static(path.join(__dirname,"public")));

// const upload = multer({ dest: 'uploads/' });

//.. Templating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//global variables -loaded at start
/////////////////////////////////////////////////////////////

app.get('/sqliteMigrate', async (req, res) =>{
// await BusinessType.destroy({where:{}});
await BusinessType.truncate({ cascade: true });

const data = [
    {id:1, name : "plumber"},
    {id:2, name : "electrition"},
    {id:3, name : "tutor"},
];
await BusinessType.bulkCreate(data);
res.status(200).json({"message": "Sqlite migration Success"});
});


app.get('/sqlite', async (req, res) =>{

const BusinessTypeSeq = await    BusinessType.findAll({where: {}});
const BusinessTypes = BusinessTypeSeq.map(r => r.toJSON());

res.status(200).json({BusinessTypes});
});

app.get('/migration', async (req, res) =>{
migration().then(()=>{
res.status(200).json({"message": "DB migration Success"});
});
});


app.get('/tailwind',  (req, res) =>{
res.status(200).render('tailwind');
});



app.get('/superuser', (req, res) => {
    superuserController(req, res);
});


app.get('/registerbusiness', (req, res) => {
registerbusinessController(req, res);
// return res.status(200).send('registerbusiness');
});
////////////////////////////////////////////////////////



app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







