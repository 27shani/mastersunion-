"use client";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-14">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">Contact</h1>
      <p className="text-muted text-sm mb-8">For order-related queries write to helpdesk@mastersunion.org</p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Name" className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-foreground" />
        <input type="email" placeholder="Email" className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-foreground" />
        <textarea placeholder="Message" rows={4} className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-foreground resize-none" />
        <button type="submit" className="btn btn-primary h-12 px-8 rounded-full text-sm font-medium">Send message</button>
        <p className="text-xs text-muted">This is a frontend prototype. Messages are not sent.</p>
      </form>
    </div>
  );
}
