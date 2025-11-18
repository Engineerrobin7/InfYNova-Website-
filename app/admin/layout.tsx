import Link from "next/link";
import { Home, Trophy, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Link>
              <div className="h-6 w-px bg-border" />
              <h2 className="text-lg font-bold">Admin Dashboard</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/challenges" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Challenges</span>
              </Link>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
