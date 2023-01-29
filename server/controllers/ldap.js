// const ldapClient = require('simple-ldap-client')

// exports.authenicateUser = (req, res) => {
//     const url = 'ldaps://ds.uoc.gr:656'
//     const baseDn = 'OU=csd,DC=uoc,DC=gr'
//     const upn = req.body.username;
//     const password = req.body.password;

//     let ldap = new ldapClient(url, baseDn)

//     ldap.authenticate({ upn, password })
//         .then(() => {
//             console.log('authentication successful')
//         })
//         .catch(error => {
//             console.log(error)
//         })

// }

var Imap = require('imap'),
    inspect = require('util').inspect;

exports.authenicateUser = (req, res) =>{
    const upn = req.body.username;
    const password = req.body.password;
    console.log( "---------username: " + upn + " password: " + password)
    var imap = new Imap({
        user: upn,
        password: password,
        host: 'mailhost.csd.uoc.gr',
        port: 993,
        tls: true
      });

      imap.connect();

      imap.once('ready', () => {
        console.log('connection succesful');
        res.status(201).send("User Authenticated");
        
        imap.end();
      });

      imap.once('error', function(err) {
        console.log(err);
        res.status(404).send(err.message)
      });

      imap.once('end', function() {
        console.log('Connection ended');
      });

   

      

    
    }




