import formData from "form-data";
import Mailgun from "mailgun.js";
import { createClient } from "@supabase/supabase-js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function sendNewsletter(
  subject: string,
  content: string,
  tags: string[]
) {
  // Hole alle Abonnenten die mindestens einen der angegebenen Tags haben
  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("email")
    .contains("tags", tags);

  if (!subscribers?.length) return;

  const recipients = subscribers.map((sub) => sub.email);

  // Sende E-Mail über Mailgun
  await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `Newsletter <newsletter@${process.env.MAILGUN_DOMAIN}>`,
    to: "newsletter@${process.env.MAILGUN_DOMAIN}",
    bcc: recipients,
    subject,
    text: content,
    html: content,
  });
}
