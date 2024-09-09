import { connectDB } from "@/lib/config/db";
import { Email } from "@/lib/models/emailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  connectDB();
};

LoadDB();

export async function POST(request) {
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await Email.create(emailData);
  return NextResponse.json({ success: true, msg: "Email saved successfully" });
}

export async function GET(request) {
  const emails = await Email.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(request) {
  const emailId = request.nextUrl.searchParams.get("id");
  await Email.findByIdAndDelete(emailId);
  return NextResponse.json({ success: true, msg: "Email Deleted." });
}
