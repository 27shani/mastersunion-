import { announcements } from "@/data/home";

// Scrolling text marquee above the header. Not fixed: it scrolls away with the page.
export default function AnnouncementBar() {
  const items = [...announcements, ...announcements];
  return (
    <div className="mu-announce relative z-[60] overflow-hidden bg-neutral-950 text-white" role="region" aria-label="Announcements">
      <ul className="mu-announce-track flex w-max items-center py-2 text-[11px] font-medium uppercase tracking-[0.18em] lg:py-2.5 lg:text-xs">
        {[...items, ...items].map((t, i) => (
          <li key={i} aria-hidden={i >= announcements.length} className="flex items-center whitespace-nowrap">
            <span className="px-8">{t}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
          </li>
        ))}
      </ul>
    </div>
  );
}
