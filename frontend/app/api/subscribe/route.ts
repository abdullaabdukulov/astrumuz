import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real application, you would validate the email and save it to a database
    // or send it to a newsletter service like Mailchimp

    return NextResponse.json({
      success: true,
      message: "Вы успешно подписались на рассылку",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Произошла ошибка при подписке" }, { status: 500 })
  }
}
