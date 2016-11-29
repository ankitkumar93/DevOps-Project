var email_config = {
    auth: {
        service: 'Gmail',
        user: 'team.mail.devops.build@gmail.com',
        password: 'qwerty@2016'
    },
    options: {
        from: '"DevOps Support" <team.mail.devops.build@gmail.com>',
        to: 'ankit.technited@gmail.com',
        subjectfail: 'Build Status - Fail on Branch - ',
        subjectpass: 'Build Status - Success on Branch - ',
        textfail: 'Your most recently build failed.',
        textpass: 'Your most recently build was successfull.',
        logurl: '138.197.32.179/:8000/log?id='
    }
};

module.exports = email_config;