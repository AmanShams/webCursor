import UserButton from "@/features/auth/components/user-button";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            The Modern Web-based IDE
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Code, compile, and collaborate all in one powerful, browser-based
            environment. No setup required.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button className="px-6 py-2.5 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors duration-200">
            Start Coding Now
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-5 h-5 text-muted-foreground"
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
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Powerful Editor
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Syntax highlighting, intelligent code completion, and customizable
              themes for an enhanced coding experience.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-5 h-5 text-muted-foreground"
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
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Real-time Collaboration
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Code together with others in real-time. Share your workspace
              instantly and work as a team.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-5 h-5 text-muted-foreground"
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
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Multiple Languages
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Support for JavaScript, Python, Java, C++, and more. Run code
              directly in your browser.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
