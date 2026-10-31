import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted mb-8">This page could not be found.</p>
      <Link href="/" className="btn btn-primary px-8 h-12 rounded-full text-sm font-medium inline-flex items-center">
        Back to home
      </Link>
    </div>
  );
}
