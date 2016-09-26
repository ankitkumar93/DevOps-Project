var email_config = {}
    auth: {
        service: 'Gmail',
        user: 'team.mail.devops.build@gmail.com',
        password: 'qwerty@2016'
    },
    options: {
        from: '"DevOps Support" <team.mail.devops.build@gmail.com>',
        to: 'ankit.technited@gmail.com',
        subjectfail: 'Build Status - Fail',
        subjectpass: 'Build Status - Success',
        textfail: 'Your most recently build failed',
        textpass: 'Your most recently build was successfull'
        logurl: '54.213.145.239:8000/log?id='
    }
};

module.exports = auth_data;