import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json")

type Item = {
  id: string
  name: string
  price: number
  quantity: number
}

type Customer = {
  email: string
  name: string
  address: string
  city: string
  postalCode: string
  country: string
}

type Order = {
  orderId: string
  items: Item[]
  customer: Customer
  total: number
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customer, total } = body as {
      items: Item[]
      customer: Customer
      total: number
    }

    // Validate required fields
    if (!customer?.email || !customer?.name) {
      return NextResponse.json(
        { success: false, error: "Email and name are required." },
        { status: 400 }
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty." },
        { status: 400 }
      )
    }

    // Generate order
    const order: Order = {
      orderId: crypto.randomUUID(),
      items,
      customer: {
        email: customer.email,
        name: customer.name,
        address: customer.address || "",
        city: customer.city || "",
        postalCode: customer.postalCode || "",
        country: customer.country || "",
      },
      total,
      createdAt: new Date().toISOString(),
    }

    // Persist to data/orders.json
    let orders: Order[] = []
    try {
      const raw = await fs.readFile(ORDERS_FILE, "utf-8")
      orders = JSON.parse(raw)
    } catch {
      orders = []
    }
    orders.push(order)
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8")

    return NextResponse.json({ success: true, orderId: order.orderId })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    )
  }
}
