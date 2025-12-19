import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongoose";
import Order from "../../../../../models/Order";
import AcceptedOrder from "../../../../../models/AcceptedOrder";

export async function POST(request) {
  await connectDB();

  try {
    const { orderId, rest } = await request.json();

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    await AcceptedOrder.create({ ...order.toObject(), rest });
    await Order.findByIdAndDelete(orderId);

    return NextResponse.json({ success: true, message: "Order accepted and moved" });
  } catch (err) {
    console.error("❌ Accept order error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
