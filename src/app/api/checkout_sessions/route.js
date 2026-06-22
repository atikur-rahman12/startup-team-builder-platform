import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const sessionData = await auth.api.getSession({
      headers: headersList,
    });

    const founderEmail = sessionData?.user?.email;

    if (!founderEmail) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: founderEmail,

      metadata: {
        userEmail: founderEmail,
        userId: sessionData.user.id,
      },

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",

      success_url: `${origin}/dashboard/founder/premium-plan/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/founder`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
