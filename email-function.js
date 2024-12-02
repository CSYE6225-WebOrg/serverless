import sendGridMail from '@sendgrid/mail';
import { config } from "dotenv";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
const secretsManager = new SecretsManagerClient({ region: "us-east-1" });
config();
// Configure SendGrid
//sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);



export const handler = async (event) => {
  try {
      // Get SendGrid API key from environment variables
      const email_secret = process.env.EMAIL_SECRET_NAME;
      const secretResponse = await secretsManager.send(
        new GetSecretValueCommand({ SecretId: email_secret })
      );
      const credentials = JSON.parse(secretResponse.SecretString);
      const sendgridApiKey = credentials.SENDGRID_API_KEY;
      const from_email = credentials.SENDGRID_FROM_EMAIL;

      sendGridMail.setApiKey(sendgridApiKey);




    console.log("Received event:", JSON.stringify(event, null, 2));

    // Parse SNS message
    const snsMessage = event.Records[0].Sns.Message;
    const { email, verificationLink } = JSON.parse(snsMessage);



    // Send email via SendGrid
    const emailContent = {
      to: email,
      from: from_email, // Your verified sender email
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
