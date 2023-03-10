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
const dbComController = require('./controllers/dbComController');   
// const PORT = process.env.PORT || 80;
const PORT = 3000;
const apiRouter = require('./routes/apiRouter');
const pagesRouter = require('./routes/pagesRouter');
const loginRouter = require('./routes/loginRouter');
const devRouter = require('./routes/devRouter');
const cityRouter = require('./routes/cityRouter');
const adminRouter = require('./routes/adminRouter');
const businessTypeRouter = require('./routes/businessTypeRouter');
const areaRouter = require('./routes/areaRouter');


const  { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
////////////////////////////////////////////////////
const app = express()
app.use(cookieParser());
//.. static files
app.use(express.static(path.join(__dirname,"public")));
//..
// app.use(cors({origin: process.env.HOME_URL}));
// app.use(cors({origin: "http://localhost/"}));
app.use(cors({origin: "http://localhost:8080"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/",pagesRouter);
app.use("/",loginRouter);
app.use("/",devRouter);
app.use("/api",apiRouter);
app.use("/admin",adminRouter);
app.use("/city",cityRouter);
app.use("/businessType",businessTypeRouter);
app.use("/area",areaRouter);

//.. Templating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
///////////////////////////Routes////////////////////////

/**
    //--login-routes
1.register (form and process)
2.login (form and process)
3.logout (process)

4.Search Businesses - home page (form ,process , hydration)
5.register_business (form and process)
6.Businesses - list page (form/page)
7.Businesses -individual page (form/page)
8.Edit business
9.edit user profile.
---------------------
10.create region
 */

app.get('/dbtest', async (req, res) =>{
dbComController( req, res);
//---------------------------
});


////////////////////////////////////////////////////////

app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});







