var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'team.mail.devops.build@gmail.com', // Your email id
		pass: 'qwerty@2016' // Your password
	}
});

var text = 'This is mail from dev ops support'

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"DevOps Support" <team.mail.devops.build@gmail.com>', // sender address
    to: 'vipulkashyap111@gmail.com', // list of receivers
    subject: 'Build Status', // Subject line
    text: text, // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});