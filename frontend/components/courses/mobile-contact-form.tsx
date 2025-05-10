import Link from "next/link"

export function MobileContactForm() {
  return (
    <section className="px-4 py-6 md:hidden">
      <div className="bg-[#6a3de8] rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Оставьте заявку</h2>
        <p className="text-white text-sm mb-6">
          и с вами свяжется наш менеджер. Расскажите ему о своих пожеланиях, и мы подберём программу, чтобы решить ваши
          задачи
        </p>
        <Link href="#" className="inline-block bg-[#00e5b0] text-black font-medium py-3 px-8 rounded-full">
          Оставить заявку
        </Link>
      </div>
    </section>
  )
}
