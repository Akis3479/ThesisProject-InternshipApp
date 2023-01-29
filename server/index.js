const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https')
//const ldapClient = require('simple-ldap-client')


const app = express();

const mainRoutes = require('./routes/main');
const AnnouncementRouter = require('./routes/announcements');
const userRouter = require('./routes/user');
const studentRouter = require('./routes/student');
const intershipDatesRouter = require('./routes/intershipDates.js');
const fileDownload = require('./routes/fileDownload.js')
const authUser = require('./routes/ldap.js')
const protocolNum = require('./routes/protocolNum.js')

app.use(cors());

app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));

app.use('/main', mainRoutes);
app.use('/student',studentRouter);
app.use('/announcement',AnnouncementRouter);
app.use('/user', userRouter);
app.use('/intershipDates', intershipDatesRouter);
app.use('/download', fileDownload);
app.use('/authUser', authUser);
app.use('/protocol', protocolNum);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const CONNECTION_URL = 'mongodb+srv://admin3479:1NNU6FKGj3gwb14y@cluster0.5ub25.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5500;


mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () => 
    console.log(`Listening on port: ${PORT}` )
)).catch((err) => console.log(err.message));

// mongoose.connect(CONNECTION_URL, {
//     useNewUrlParser: true, useUnifiedTopology: true
// }).then(() =>https.createServer({
//     cert: certificate
//   },  app).listen(PORT, () => 
//     console.log(`Listening on port: ${PORT}` )
// )).catch((err) => console.log(err.message));


