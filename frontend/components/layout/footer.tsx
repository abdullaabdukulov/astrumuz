"use client"

import Image from "next/image"
import { SocialLinks } from "@/components/ui/social-links"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

export function Footer() {
  const { language } = useLanguage()

  // Get translations for the current language
  const footerText = translations.footer[language as keyof typeof translations.footer] || translations.footer.ru

  return (
    <footer className="w-full">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Purple section */}
        <div className="bg-[#6a3de8] text-white py-16 px-8 md:px-16 md:w-1/2">
          <div className="max-w-lg mx-auto md:ml-auto md:mr-0">
            {/* CTA Section */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4">
                {footerText.readyToBecome} <br />
                {footerText.student}
              </h2>
              <p className="text-lg mb-6">{footerText.opportunity}</p>
              <a
                href="#courses"
                className="inline-block bg-white text-[#6a3de8] font-medium py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors"
              >
                {footerText.wantToStudy}
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white bg-opacity-20 my-10"></div>

            {/* Careers Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{footerText.joinTeam}</h3>
              <a
                href="#"
                className="inline-block border border-white text-white font-medium py-3 px-8 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors mt-4"
              >
                {footerText.viewVacancies}
              </a>
            </div>
          </div>
        </div>

        {/* Right side - Dark blue section */}
        <div className="bg-[#050e2d] text-white py-16 px-8 md:px-16 md:w-1/2">
          <div className="max-w-lg mx-auto md:mr-auto md:ml-0">
            {/* Logo and social links */}
            <div className="mb-16">
              <div className="mb-8">
                <Image
                  src="/images/logo.png"
                  alt="Astrum IT Academy"
                  width={175}
                  height={70}
                  className="h-[70px] w-auto"
                />
              </div>
              <SocialLinks />
            </div>

            {/* Footer links */}
            <div className="grid grid-cols-3 gap-8">
              {/* Academy column */}
              <div>
                <h4 className="text-gray-400 font-medium mb-4">{footerText.academy}</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      — {footerText.home}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.news}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.blog}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.partners}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.career}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.corporate}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Courses column */}
              <div>
                <h4 className="text-gray-400 font-medium mb-4">{footerText.courses}</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      Python Django
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      PHP (Laravel)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      Node Js
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      C# .Net
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      React.js
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact column */}
              <div>
                <h4 className="text-gray-400 font-medium mb-4">{footerText.contact}</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.aboutUs}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.faq}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#00e5b0] transition-colors">
                      {footerText.contacts}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-16 text-gray-400 text-sm">{footerText.copyright}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
