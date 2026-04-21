import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, tags } = req.body;

  console.log("Received request:", { email, tags }); // Debug log
  console.log("Environment variables:", {
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  }); // Check if env vars are set

  try {
    console.log("Checking for existing subscriber...");
    // Check if email already exists
    const { data: existingSubscriber, error: searchError } = await supabase
      .from("subscribers")
      .select()
      .eq("email", email)
      .single();

    if (searchError) {
      console.error("Error searching for subscriber:", searchError);
    }

    console.log("Existing subscriber:", existingSubscriber);

    if (existingSubscriber) {
      console.log("Updating existing subscriber...");
      const { error: updateError } = await supabase
        .from("subscribers")
        .update({ tags: tags })
        .eq("email", email);

      if (updateError) {
        console.error("Error updating subscriber:", updateError);
        throw updateError;
      }
    } else {
      console.log("Creating new subscriber...");
      const { error: insertError } = await supabase
        .from("subscribers")
        .insert([{ email, tags }]);

      if (insertError) {
        console.error("Error inserting subscriber:", insertError);
        throw insertError;
      }
    }

    console.log("Sending confirmation email...");
    try {
      // Während der Entwicklung/Test-Phase
      const testEmail = "simonpeep@gmail.com"; // Die E-Mail, mit der Sie sich bei Resend registriert haben
      const emailResult = await resend.emails.send({
        from: "mail@eliaspfeffer.de",
        to: testEmail, // Temporär nur an Ihre Test-Email
        subject: "Confirm your newsletter subscription",
        html: `
          <p>Thanks for subscribing to my newsletter!</p>
          <p>Subscriber email: ${email}</p>
          <p>Subscribed to the following topics: ${tags.join(", ")}</p>
        `,
      });
      console.log("Email sent successfully:", emailResult);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      throw emailError;
    }

    res.status(200).json({ message: "Successfully subscribed" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
