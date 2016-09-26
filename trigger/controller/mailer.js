var nodemailer = require('nodemailer');
var email_config = require('./email_config.js');

var transporter = nodemailer.createTransport({
    service: email_config.auth.service,
    auth: {
        user: email_config.auth.user, // Your email id
        pass: email_config.auth.password // Your password
    }
});


// Send Mail
function sendMail(status, logid){
    
    var textToSend;
    var subjectToSend;
    if (status == 'failure'){
        textToSend = email_config.options.textfail;
        subjectToSend = email_config.options.subjectfail;
    } else {
        textToSend = email_config.options.textpass;
        subjectToSend = email_config.options.subjectpass;
    }

    var logurl = email_config.options.logurl + logid;

    textToSend += '</br> Log File: ' + logurl;

    var mailOptions = {
        from: email_config.options.from,
        to: email_config.options.to,
        subject: subjectToSend,
        text: textToSend
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = sendMail;