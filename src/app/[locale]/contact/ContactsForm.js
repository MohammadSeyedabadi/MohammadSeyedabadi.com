"use client";
import { useParams } from "next/navigation";
export default function ContactsFrom() {
    const lang = useParams().locale;
  return (
    <aside>
      <div className="contact-sidebar-card">
        <form>
          <div>
            <label htmlFor="name">{lang === "en" ? "Name:" : "نام:"}</label>
            <input type="text" id="name" required disabled value={lang === "en" ? "disabled" : "غیر فعال"} />
          </div>
          <div>
            <label htmlFor="email">{lang === "en" ? "Email:" : "ایمیل:"}</label>
            <input type="text" id="email" required disabled value={lang === "en" ? "disabled" : "غیر فعال"} />
          </div>
          <div>
            <label htmlFor="message">{lang === "en" ? "Message:" : "پیام:"}</label>
            <textarea id="message" required disabled value={lang === "en" ? "disabled" : "غیر فعال"} />
          </div>
          <div>Button</div>
        </form>
      </div>
    </aside>
  );
}
