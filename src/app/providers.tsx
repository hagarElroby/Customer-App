"use client";
import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import EventHandler from "@/components/shared/EventHandler";
interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <EventHandler />
        {children}
      </Suspense>
    </Provider>
  );
}
