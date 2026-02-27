import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-8 max-w-6xl mx-auto">
        <div className="font-bold text-xl mr-8">AssetTracker</div>
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/assets"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Assets
          </Link>
        </div>
      </div>
    </nav>
  );
}
