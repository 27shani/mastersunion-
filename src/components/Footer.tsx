import Link from "next/link";

// TODO: confirm phone/WhatsApp and social URLs.
const cols = [
  { h: "Connect with us", l: [["Call", "/contact"], ["Text (WhatsApp)", "/contact"], ["Instagram", "https://www.instagram.com/mastersunion/"], ["YouTube", "https://www.youtube.com/@mastersunion"], ["LinkedIn", "https://www.linkedin.com/school/masters-union/"]] },
  { h: "Order Support", l: [["Make a return/Exchange", "/return-policy"], ["Refund/Exchange policy", "/return-policy"], ["Track your order", "/contact"], ["Shipping policy", "/shipping-policy"], ["FAQ's", "/faq"], ["Terms", "https://shop.mastersunion.org/pages/terms-conditions"]] },
  { h: "We are Master's Union", l: [["Our story", "/about"], ["Campus store", "/#campus"], ["Collaborations", "/contact"], ["Privacy policy", "/privacy-policy"], ["Contact", "/contact"]] },
];

export default function Footer() {
  return (
    <footer className="bg-canvas px-2 pb-4 pt-3 lg:px-3">
      <div className="rounded-3xl bg-white px-5 py-8 lg:px-14 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.9fr_1.1fr] lg:items-center lg:gap-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 lg:gap-x-10">
            {cols.map((c) => (
              <nav key={c.h} aria-label={c.h}>
                <h3 className="mb-3 text-[13px] font-medium text-neutral-900 lg:mb-4">{c.h}</h3>
                <ul className="space-y-2 text-[12px] font-normal text-neutral-500 lg:space-y-2.5">
                  {c.l.map(([t, h]) => (
                    <li key={t}>
                      {h.startsWith("http") ? (
                        <a href={h} target="_blank" rel="noopener noreferrer" className="transition hover:text-black">{t}</a>
                      ) : (
                        <Link href={h} className="transition hover:text-black">{t}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          {/* cursive brand mark, right side */}
          <p
            className="text-center text-[44px] leading-none text-neutral-500 sm:text-[56px] lg:text-[60px] xl:text-[72px]"
            style={{ fontFamily: "var(--font-script), cursive" }}
            aria-label="Master's Union"
          >
            Master&apos;s Union
          </p>
        </div>
        <p className="mt-8 text-center text-[9px] uppercase tracking-wide text-neutral-500 lg:mt-6 lg:text-right">
          © {new Date().getFullYear()} Master&apos;s Union Merch Store, all rights reserved
        </p>
      </div>
    </footer>
  );
}
