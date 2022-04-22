import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
// @ts-ignore
export const sendMail = async (email, firstName, lastName, price , fileRef) => {
    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        })

        const handlebarOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: './src/utils/',
                defaultLayout: false,
            },
            viewPath: './src/utils/',
            extName: '.handlebars',
        }

        // @ts-ignore
        mailTransporter.use('compile', hbs(handlebarOptions))
        let mailDetails = {
            from: process.env.EMAIL,
            to: `${email}`,
            subject: 'Refund notice',
            template: 'email',
            context: {
                firstName: firstName,
                lastName: lastName,
                price: price,
                fileRef:fileRef
            },
        }
// @ts-ignore
        await mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs', err)
            } else {
                console.log('Email sent successfully', data)
            }
        })
    } catch (error) {
        console.log(error)
    }
}


