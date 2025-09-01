import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Hero Section */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            The Modern Web-based IDE
          </h1>
          <p className="text-base text-muted-foreground  mx-auto">
            Code, compile, and collaborate in a powerful, browser-based
            environment. <br /> No setup required.
          </p>
        </div>

        {/* CTA Buttons */}
        <Link href="/dashboard">
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-1">
            <button className="px-4 py-2 shadow-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors duration-200">
              Start Coding Now
            </button>
          </div>
        </Link>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <div className="p-4 shadow-sm rounded-lg border bg-card text-card-foreground">
            <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mb-3 mx-auto">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1 text-foreground">
              Powerful Editor
            </h3>
            <p className="text-muted-foreground text-xs">
              Syntax highlighting, code completion, and customizable themes.
            </p>
          </div>

          <div className="p-4 shadow-sm rounded-lg border bg-card text-card-foreground">
            <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mb-3 mx-auto">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1 text-foreground">
              Real-time Collaboration
            </h3>
            <p className="text-muted-foreground text-xs">
              Code together in real-time and share your workspace instantly.
            </p>
          </div>

          <div className="p-4 shadow-sm rounded-lg border bg-card text-card-foreground">
            <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mb-3 mx-auto">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1 text-foreground">
              Multiple Languages
            </h3>
            <p className="text-muted-foreground text-xs">
              Support for JavaScript, Python, Java, C++, and more in-browser.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
