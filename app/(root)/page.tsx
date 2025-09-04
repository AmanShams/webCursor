import Link from "next/link";
import { Bot, Code2, SquareTerminal } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Hero Section */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            The Modern Web-based IDE
          </h1>
          <p className="text-base text-muted-foreground mx-auto">
            Code, compile, and build faster in a powerful, browser-based
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
          {/* Feature 1 */}
          <div className="p-4 shadow-sm rounded-lg border bg-card text-card-foreground">
            <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mb-3 mx-auto">
              <Code2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold mb-1 text-foreground">
              Powerful Editor
            </h3>
            <p className="text-muted-foreground text-xs">
              Syntax highlighting, code completion, and customizable themes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-4 shadow-sm rounded-lg border bg-card text-card-foreground">
            <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mb-3 mx-auto">
              <SquareTerminal className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold mb-1 text-foreground">
              Framework Support
            </h3>
            <p className="text-muted-foreground text-xs">
              Built-in support for React, Next.js, and Vue projects out of the
              box.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-4 shadow-sm rounded-lg border bg-card text-card-foreground">
            <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mb-3 mx-auto">
              <Bot className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold mb-1 text-foreground">
              AI Assistance
            </h3>
            <p className="text-muted-foreground text-xs">
              Drop your API key and start coding with AI-powered chat & support.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
