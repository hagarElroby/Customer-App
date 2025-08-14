"use client";
import React from "react";
import { usePathname } from "next/navigation";

class ErrorBoundaryInner extends React.Component<
  { children: React.ReactNode; path: string },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: { path: string }) {
    // Reset if the route changes
    if (prevProps.path !== this.props.path) {
      this.setState({ hasError: false, error: null });
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 min-h-screen bg-gray-50">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="text-gray-600 mt-2">
            Please try refreshing the page or contact support.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-main text-white px-6 py-2 rounded-lg"
          >
            Return Back
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return <ErrorBoundaryInner path={path}>{children}</ErrorBoundaryInner>;
}
