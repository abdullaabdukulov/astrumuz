import { NextResponse } from "next/server"
import { COURSES } from "@/lib/constants"

export async function GET() {
  // In a real application, this would fetch from a database
  return NextResponse.json({ courses: COURSES })
}
