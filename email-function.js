import sendGridMail from '@sendgrid/mail';
import { config } from "dotenv";
config();
// Configure SendGrid
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);



export const handler = async (event) => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));

    // Parse SNS message
    const snsMessage = event.Records[0].Sns.Message;
    const { email, verificationLink } = JSON.parse(snsMessage);



    // Send email via SendGrid
    const emailContent = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL, // Your verified sender email
      subject: "Email Verification Link for webapp",
      text: `Hi user,\n\nClick the link below to verify your email. The link expires in 2 minutes:\n\n${verificationLink}`,
      html: `<strong>Click on the following link to verify your email address:</strong> <a href="${verificationLink}">${verificationLink}</a>`,
    };

    try {
        // Send the email using SendGrid
        await sendGridMail.send(emailContent);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error(`Failed to send email to ${email}`);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Processing SNS message complete' }),
    };

   
  } catch (error) {
    console.error("Error processing Lambda function:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
