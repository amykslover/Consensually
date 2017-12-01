module.exports = {

    'facebookAuth' : {
        'clientID'      : '1376574052470030',
        'clientSecret'  : '774037ff78c23a030f3ca83dc1b6bb0f',
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileFields' : ['emails', 'displayName'] // For requesting permissions from Facebook API
    }


    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    // }

};