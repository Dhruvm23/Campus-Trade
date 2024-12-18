const router = require('express').Router()
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    hostL: 'smtp.gmail.com',
    auth: {
        user: "kabirsinghlambaksl@gmail.com",
        pass: "dsyq ulny ffbp iuhw"
    }
})

router.post('/userapproved', (req, res) => {
    transporter.sendMail({
        from: "kabirsinghlambaksl@gmail.com",
        to: req.body.email,
        subject: 'Account Approved for Campus Trade',
        html: `
            <p>Dear ${req.body.fullName},</p>
            <p>Your accout verification has been approved. You are now a verified member of Campus Trade.</p>
            <p>Get ready to indulge in a delightful shopping experience! Explore our vast collection of products, browse to your heart's content, and discover the perfect items for your needs.</p>
            <p>Thank you for choosing us as your trusted shopping destination. Start browsing now and embark on a journey of happy purchasing!</p>
            <p>
            Best Regards,<br />
            Campus Trade
            </p>
        `
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent')
        }
    })
    console.log('Successfully sent')
})

router.post('/newuser', (req, res) => {
    transporter.sendMail({
        from: 'kabirsinghlambaksl@gmail.com',
        to: req.body.email,
        subject: 'New user sign up',
        html: `
            <p>There has been new user sign up. Here are the details:</p>
            <p>
            Full Name: ${req.body.fullName} <br />
            Email: ${req.body.email} <br />
            Phone Number: ${req.body.phoneNumber} <br />
            College Id: ${req.body.collegeId} <br />
            Department: ${req.body.department}
            </p>
        `
    }, err => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent')
        }
    })
})

router.post('/buy', (req, res) => {
    transporter.sendMail({
        from: 'campustrade09@gmail.com',
        to: req.body.email,
        subject: 'New product purchase',
        html: `
            <p>Here are the details of the seller:</p>
            <p>
                Full Name: ${req.body.fullName} <br />
                Email: ${req.body.sellerEmail} <br />
                Phone Number: ${req.body.phoneNumber} <br />
            </p>
        `
    }, err => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent')
        }
    })
})

module.exports = router