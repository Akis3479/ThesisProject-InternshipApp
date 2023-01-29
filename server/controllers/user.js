const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
var Imap = require('imap'),
inspect = require('util').inspect;
const bcrypt = require ('bcrypt');

const saltRounds = 10;



exports.createUser = async (req, res) => {
    let user = req.body

    let newUser = new User(user);

    try {
        console.log(newUser);
        bcrypt.genSalt (saltRounds, function (err, salt) {
            bcrypt.hash (newUser.password,salt,function (err, hash) {
                newUser.password = hash;
                newUser.save();
                console.log(newUser);
            })
        });
        //await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(404)
    }
}



exports.login = async (req, res) => {
    const tEmail = req.body.email;
    const cuser = await User.findOne({username: tEmail});

    console.log("------cUserIS-------",cuser)


    // const user = await User.findOne({
    //     email: req.body.email,
    //     password: req.body.password,
    // })
    

    if (cuser) {
        console.log("----------------------",cuser)
        bcrypt.compare(req.body.password ,cuser.password, function(err, result) {
            if (result) {
              console.log("It matches!")
              const token = jwt.sign(
                {
                    email: cuser.username,
                    userType: cuser.userType,
                },
                'secret123'
            )
    
            return res.json({ status: 'ok', user: token })
            }
            else {
              console.log("Invalid password!");
            }
        });

        // const token = jwt.sign(
        //     {
        //         email: user.username,
        //         userType: user.userType,
        //     },
        //     'secret123'
        // )

        // return res.json({ status: 'ok', user: token })
    } else {

        var imap = new Imap({
            user: (req.body.email).split('@')[0],
            password: req.body.password,
            host: 'mailhost.csd.uoc.gr',
            port: 993,
            tls: true
        });



        imap.once('ready', async () => {
            console.log('connection successful');
            //res.status(201).send("User Authenticated");
            let data = {
                username: req.body.email,
                password: req.body.password,
                userType: 'student'
            }
            const newUser = new User(data);
            try {
                console.log(newUser);
                //await newUser.save();
                //res.status(201).json(newUser);
                //Send the token
                bcrypt.genSalt (saltRounds, function (err, salt) {
                    bcrypt.hash (newUser.password,salt,function (err, hash) {
                        newUser.password = hash;
                        newUser.save();
                        console.log(newUser);
                    })
                });
                const tokenUser = jwt.sign(
                    {
                        email: data.username,
                        userType: data.userType,
                    },
                    'secret123'
                )

                return res.json({ status: 'ok', user: tokenUser })
            } catch (err) {
                res.status(404)
            }
            imap.end();
        });

        imap.once('error', function (err) {
            console.log(err);
            res.status(404).send(err.message)
        });

        imap.once('end', function () {
            console.log('Connection ended');
        });

        imap.connect();

    }

}