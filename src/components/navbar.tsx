"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/cn";

import { focusRingClassName, interactiveTransitionClassName } from "./styles";

const navItems = [
  { href: appRoutes.home, label: "Home", match: (path: string) => path === appRoutes.home },
  { href: appRoutes.about, label: "About", match: (path: string) => path.startsWith(appRoutes.about) },
  {
    href: appRoutes.categories,
    label: "Categories",
    match: (path: string) => path.startsWith(appRoutes.categories),
  },
  {
    href: appRoutes.providers,
    label: "Providers",
    match: (path: string) => path.startsWith(appRoutes.providers),
  },
  {
    href: appRoutes.compare,
    label: "Compare",
    match: (path: string) => path.startsWith(appRoutes.compare),
  },
] as const;

function NavLink({
  href,
  label,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative rounded-sm px-3 py-2 text-sm font-medium tracking-[-0.01em]",
        interactiveTransitionClassName,
        focusRingClassName,
        isActive
          ? "text-primary after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:content-['']"
          : "text-muted motion-safe:hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <Link
          href={appRoutes.home}
          className={cn(
            "font-brand text-[17px] tracking-[0.1em] text-primary",
            focusRingClassName,
            interactiveTransitionClassName,
            "motion-safe:hover:text-primary/85",
          )}
        >
          APINEER
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={item.match(pathname)}
            />
          ))}
        </nav>

        <button
          type="button"
          className={cn(
            "inline-flex items-center rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground md:hidden",
            focusRingClassName,
            interactiveTransitionClassName,
            "motion-safe:hover:border-primary/30 motion-safe:hover:bg-primary/5",
          )}
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Close menu" : "Menu"}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          id={menuId}
          aria-label="Primary mobile"
          className="border-t border-border px-6 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  isActive={item.match(pathname)}
                  onNavigate={() => setMobileOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
