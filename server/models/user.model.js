// Set up the user model with login name,email & password validations,use bcypt for password encryption, confirm password
// and set up the user model with a method to generate a token for the user.
// Use mongoose to create a user model.

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');




// Create a user schema
const UserSchema = new mongoose.Schema({
    
    

    userName : {
        type : String,
        requried : [true, 'User name is required']
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        validate : {
            validator : val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message : "Please enter a valid email address"
        }
    },
    
    password: {
        type : String,
        required : [true, 'Password is required'],
        minlength : [8, 'Password must be at least 8 characters long'],
    },
    // confirmPassword: {
    //     type: String,
    //     required : [true, 'Password is required'],
    //     minlength : [8, 'Password must be at least 8 characters long'],
    // }


}, {timestamps : true});


// Confirm password with mongoose virtuals
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword)
    .set( value =>  (this._confirmPassword  = value));


UserSchema.pre('validate', function(next){
    console.log('this.password', this.password);
    console.log('this.confirmPassword', this._confirmPassword);
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Password does not match');
    } 
    next();
   
  });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
});



//Make use of Middleware to add in another validation using a prehook







const User = mongoose.model('User', UserSchema);
module.exports = User;



