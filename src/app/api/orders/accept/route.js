import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/mongoose";
import Order from "../../../../../models/Order";
import AcceptedOrder from "../../../../../models/AcceptedOrder";

export async function POST(request) {
  await connectionToDatabase();

  try {
    // 1. Get the MongoDB ID (sent from frontend as 'orderId') and the rest location
    const { orderId: mongoId, rest } = await request.json();

    if (!mongoId) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    // 2. Find the order using the MongoDB ID
    const order = await Order.findById(mongoId);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const orderData = order.toObject();

    // 3. Prepare the new entry
    const newEntryData = {
      ...orderData,       // 👈 This copies everything, INCLUDING the original 'orderId'
      rest: rest          // Adds the restaurant location
    };

    // 4. Remove the old database _id so a new one is created
    // (We do NOT touch 'orderId', so it stays the same as before!)
    delete newEntryData._id;
    delete newEntryData.__v;

    // 5. Create in Accepted collection
    await AcceptedOrder.create(newEntryData);

    // 6. Delete from old collection
    await Order.findByIdAndDelete(mongoId);

    return NextResponse.json({ success: true, message: "Order accepted and moved" });
  } catch (err) {
    console.error("❌ Accept order error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}