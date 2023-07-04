import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new Twilio(accountSid, authToken);

type NotificationProps = {
  number: string;
  shopName: string;
  queueName: string;
  position: number;
  personName: string;
};

const sendNotification = ({
  number,
  shopName,
  queueName,
  position,
  personName,
}: NotificationProps) => {
  client.messages
    .create({
      from: twilioNumber,
      to: number,
      body: `Hey ${personName}! You are in position ${position} in ${shopName}'s queue for ${queueName}, head back to the queue!`,
    })
    .then((message) => console.log(message.sid));
};

export default sendNotification;
