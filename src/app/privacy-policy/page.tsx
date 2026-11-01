export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <h1 className="text-[20px] lg:text-[24px] font-semibold tracking-tight mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-muted text-sm leading-relaxed">
        <p>This frontend prototype does not collect personal data or process payments.</p>
        <p>Cart and wishlist data is stored only in your browser (localStorage).</p>
        <p>Final privacy policy will be provided by Master&apos;s Union before production launch.</p>
      </div>
    </div>
  );
}
