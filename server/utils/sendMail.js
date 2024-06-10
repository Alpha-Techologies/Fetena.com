const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url, score, examName) {
    this.to = user.email;
    // this.firstname = user.name.split(" ")[0]
    this.firstName = user.firstName;
    this.url = url;
    this.from = process.env.EMAIL_FROM;
    this.score = score
    this.examName = examName
  }
  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //gmail
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        // type: "OAuth2",
        // host: `${req.protocol}://${req.get('host')}`,
        // host: `http://localhost:27000/`,
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
        //     tls: {
        //         rejectUnauthorized: false
        //     },
        //     secure: true, // use SSL
      },
    });
    // return 1;
    // }
    // return nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD,
    //     }
    // })
  }
  //Send the actual email
  async send(template, subject, password) {
    //1) render html based on template
    const html = pug.renderFile(
      `${__dirname}/../email/${template}.pug`,
      {
        firstName: this.firstName,
        email: this.to,
        password,
        url: this.url,
        subject,
        score:this.score,
        examName:this.examName
      }
    );

    //2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // text: htmlToText.fromString(html),
    };

    //3) create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(password) {
    await this.send(
      "welcome",
      `Welcome to the Fetena.com`,
      (password = password)
    );
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      `Your password reset token is valid for 10 minutes`
    );
  }

  async sendActivationToken() {
    await this.send(
      "activationToken",
      `Acivation for your Fetena.com account`
    );
  }

  async sendCertificate() {
    await this.send(
      "certification",
      `New Certificate from Fetena.com`
    );
  }

  async sendScore() {
    await this.send(
      "result",
      `Your result for your exam on Fetena.com`
    );
  }

};