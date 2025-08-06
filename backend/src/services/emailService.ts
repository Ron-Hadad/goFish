import sgMail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import ContactModel from '../models/Contact';
import MaliciousModel from '../models/Malicious';
import User from '../models/User';
require('dotenv').config()


sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const CLIENT_URL = process.env.CLIENT_URL;

export const sendPhishingEmail = async (userId: string, contacts: string[], maliciousId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Fetch the malicious message by ID
    const maliciousFormat = await MaliciousModel.findById(maliciousId);
    if (!maliciousFormat) throw new Error("Malicious format not found");

    const { sourceEmail, subject, message } = maliciousFormat; // Extract email, subject, message

    const trackingId = uuidv4();
    const errors: string[] = [];

    for (const contactId of contacts) {
      try {
        const contact = await ContactModel.findById(contactId);
        if (!contact) {
          errors.push(`Contact not found: ${contactId}`);
          continue;
        }
        const trackingLink = `${CLIENT_URL}/track/${trackingId}/${contact._id}`;
        const msg = {
          to: contact.email,
          from: {
            email: process.env.GENERIC_EMAIL_ADDRESS as string,  // Use the source email from the malicious format
            name: sourceEmail.replace(/@/g, "＠"), ///// Replace @ with fullwidth equivalent so the email services will show this name and not the "from" field (by passing the phishing or spam systems of emails)

          },
          subject: subject,
          text: `${message}\nClick here: ${trackingLink}`,
          html: `<p>${message}</p><p>Click here: <a href="${trackingLink}">${trackingLink}</a></p>`,
        };

        await sgMail.send(msg);
        contact.emailStatus = "Sent";
        await contact.save();
      } catch (error) {
        console.error(`Error sending to ${contactId}:`, error);
        errors.push(`Error sending to ${contactId}`);
      }
    }

    await user.save(); 

    if (errors.length > 0) {
      return { message: 'Emails sent with errors', errors };
    } else {
      return { message: 'Emails sent successfully' };
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error sending emails');
  }
};
