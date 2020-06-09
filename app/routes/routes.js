var ObjectID = require('mongodb').ObjectID
var password_hash = require('./hashpassword');
var mail = require('./email');
let otp_value = '';

function otp(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

module.exports = function (app, db) {

    //route to signup a user
    app.post('/signup', (req, res) => {

        //creating a hash for the password
        let cred = password_hash.saltHashPassword(req.body.password)
        let email = req.body.email;

        //verifying if the email already exist or not
        const email_verify = { 'email': email };
        db.collection('user_data').findOne(email_verify, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + item);
                if (item == null) {
                    const user_details = {
                        username: req.body.username,
                        email: req.body.email,
                        cred
                    };

                    console.log("signup data is " + user_details)
                    db.collection('user_data').insertOne(user_details, (err, result) => {
                        if (err) {
                            res.send({ 'error': 'An error has occured' });
                            console.log(err);
                        } else {
                            //  otp_value = otp(10000, 99999);
                            //mail.send_email(email, otp_value);
                            res.send({
                                'success': 'yes',
                                'message': 'User registered successfully, a verification code has been sent to your mail id.'
                            });
                        }
                    });
                } else {
                    res.send({
                        'success': 'no',
                        'message': 'This email is already in use.'
                    });
                }
            }
        });



    });


    //route to login
    app.post('/login', (req, res) => {

        let email = req.body.email;
        const email_verify = { 'email': email };
        db.collection('user_data').findOne(email_verify, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                console.log(item);
                if (item != null) {
                    let salt = item.cred.passwordData.salt;
                    let hash = item.cred.passwordData.passwordHash;

                    let verify_pass = password_hash.verifyPassword(req.body.password, salt);
                    let new_hash = verify_pass.passwordData.passwordHash;
                    if (new_hash == hash) {
                        res.send({
                            'success': 'yes',
                            'message': 'login successfull'
                        })
                    } else {
                        res.send({
                            'success': 'no',
                            'message': 'Wrong password'
                        })
                    }
                } else {
                    res.send({
                        'success': 'no',
                        'message': 'Email does not exist'
                    })
                }
            }
        })

    });

    //route to get profile data
    app.get('/profile/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('user_data').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});

};