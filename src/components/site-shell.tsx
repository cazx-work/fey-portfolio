'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/'
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    `border border-transparent px-1.5 py-1 transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${
      isActive(href)
        ? 'font-semibold text-[var(--ink)]'
        : ''
    }`;

  const navGroupClass = () =>
    'border border-transparent px-1.5 py-1';

  const navSummaryClass = (hrefs: string[]) =>
    `transition-colors hover:text-[var(--accent)] ${
      hrefs.some(isActive) ? 'font-semibold text-[var(--ink)]' : ''
    }`;

  const closeMenu = () => setOpen(false);

  const closeDropdown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    event.currentTarget.closest('details')?.removeAttribute('open');
  };

  const handleNavigationKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  const closeDetailsOnBlur = (event: React.FocusEvent<HTMLDetailsElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null;

    if (!nextFocusedElement || !event.currentTarget.contains(nextFocusedElement)) {
      event.currentTarget.open = false;
    }
  };

  return (
    <div className={`min-h-screen ${pathname === '/contact' ? 'contact-layout' : ''}`}>
      <header className="site-header sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="font-mono text-base font-bold tracking-tight transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] md:text-lg"
            aria-label="Home"
            onClick={closeMenu}
          >
            FELIX EDRIAN YBAÑEZ
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="site-menu-toggle rounded-lg border border-[var(--line)] px-3 py-2 text-sm md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            <span className="site-menu-toggle__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <nav
            id="site-navigation"
            aria-label="Primary navigation"
            onKeyDown={handleNavigationKeyDown}
            className={`${open ? 'flex' : 'hidden'} site-navigation absolute left-0 right-0 top-full flex-col gap-4 border-b border-[var(--line)] px-5 py-5 md:static md:flex md:flex-row md:items-center md:border-0 md:p-0`}
          >
            <Link href="/projects" className={navLinkClass('/projects')} aria-current={isActive('/projects') ? 'page' : undefined} onClick={closeMenu}>
              Projects
            </Link>
            <div className="site-nav-expanded site-nav-expanded--work">
              <Link href="/capabilities" className={navLinkClass('/capabilities')} aria-current={isActive('/capabilities') ? 'page' : undefined} onClick={closeMenu}>Capabilities</Link>
              <Link href="/engineering-stories" className={navLinkClass('/engineering-stories')} aria-current={isActive('/engineering-stories') ? 'page' : undefined} onClick={closeMenu}>Engineering stories</Link>
            </div>
            <details
              className={`site-nav-group site-nav-group--work ${navGroupClass()}`}
              onBlur={closeDetailsOnBlur}
            >
              <summary className={navSummaryClass(['/capabilities', '/engineering-stories'])}>Work</summary>
              <div className="site-nav-group__menu">
                <Link href="/capabilities" aria-current={isActive('/capabilities') ? 'page' : undefined} onClick={closeDropdown}>Capabilities</Link>
                <Link href="/engineering-stories" aria-current={isActive('/engineering-stories') ? 'page' : undefined} onClick={closeDropdown}>Engineering stories</Link>
              </div>
            </details>
            <div className="site-nav-expanded site-nav-expanded--profile">
              <Link href="/profile" className={navLinkClass('/profile')} aria-current={isActive('/profile') || isActive('/about') ? 'page' : undefined} onClick={closeMenu}>Profile</Link>
              <Link href="/testimonials" className={navLinkClass('/testimonials')} aria-current={isActive('/testimonials') ? 'page' : undefined} onClick={closeMenu}>Testimonials</Link>
            </div>
            <details
              className={`site-nav-group site-nav-group--profile ${navGroupClass()}`}
              onBlur={closeDetailsOnBlur}
            >
              <summary className={navSummaryClass(['/profile', '/about', '/testimonials'])}>Profile</summary>
              <div className="site-nav-group__menu">
                <Link href="/profile" aria-current={isActive('/profile') || isActive('/about') ? 'page' : undefined} onClick={closeDropdown}>Profile</Link>
                <Link href="/testimonials" aria-current={isActive('/testimonials') ? 'page' : undefined} onClick={closeDropdown}>Testimonials</Link>
              </div>
            </details>
            <Link
              href="/contact"
              className="rounded-full border border-[var(--accent)] bg-transparent px-4 py-2 font-semibold text-[var(--accent)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              aria-current={isActive('/contact') ? 'page' : undefined}
              onClick={closeMenu}
            >
              Hire me
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[var(--line)] py-10 contact-layout__footer">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-[var(--muted)] md:flex-row md:justify-between">
          <span>Systems-oriented engineering · Felix Edrian Ybañez</span>
          <span>Explicit boundaries · dependable software</span>
        </div>
      </footer>
    </div>
  );
}
