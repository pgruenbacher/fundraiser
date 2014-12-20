'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var _ = require('lodash');

var router = express.Router();

router
  .get('/', function(req,res,next){
    console.log(req.query);
    passport.authenticate('stripe', _.merge({
      failureRedirect: '/signup',
      scope:'read_write',
      session: false
    },{
      'stripe_user[email]':req.query.email,
      'stripe_user[first_name]':req.query.first,
      'stripe_user[last_name]':req.query.last,
      'stripe_user[phone_number]':req.query.tel,
      'stripe_user[business_name]':req.query.businessName,
      'stripe_user[business_type]':req.query.businessType,
      'stripe_user[dob_day]':req.query.day,
      'stripe_user[dob_month]':req.query.month,
      'stripe_user[dob_year]':req.query.year,
      'stripe_user[city]':req.query.city,
      'stripe_user[state]':req.query.state,
      'stripe_user[zip]':req.query.zip,
      'stripe_user[product_description]':req.query.description,
      'stripe_user[website]':req.query.website
    }))(req,res,next)
  })

  .get('/callback', passport.authenticate('stripe', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;