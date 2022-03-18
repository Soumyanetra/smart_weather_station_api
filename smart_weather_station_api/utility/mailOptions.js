function forgetPasswordOptions(options) {
    const generateOTP = (Math.random() + 1).toString(36).substring(7)
    const recipientName = options.to.length === 1 ? options.name : "there"
    
    const text = (name) => `Hello ${name}`
    
    const html = (name)=>(
            `<h1>
                Hello ${name}!!
            </h1>
            <br></br><br></br>
            <h2>Your OTP is:<b> ${generateOTP}</b></h2>`
    )
    
    const mailOptions = {
        to: options.to,
        subject: "OTP FOR PASSWORD RESET",
        text: text(recipientName),
        html: html(recipientName),
        otp: generateOTP
   }
    return mailOptions
}

function contactUsOptions(options) {
    
    const mailOptions = {
        to: options.to,
        subject: options.subject,
        text: options.message+"\n\nReply to: "+options.email,
        html: '',
   }
    return mailOptions
}

module.exports = {
    forgetPasswordOptions,
    contactUsOptions
}