import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const baseClass =
    'flex items-center w-full bg-glass backdrop-blur-md justify-between py-6 border-b border-hair'
  const stickyClass = siteMetadata.stickyNav ? 'sticky top-0 z-50' : ''
  const headerClass = `${baseClass} ${stickyClass}`

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} className="group">
        <div className="flex items-center justify-between gap-3">
          <div className="mr-1">
            <Logo />
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <div className="font-semibold text-ink text-lg tracking-tight">
              {siteMetadata.headerTitle}
            </div>
            <div className="font-num text-[11px] uppercase tracking-[0.18em] text-ink-3">
              Tonghang · Lab
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-1 leading-5 sm:-mr-2 sm:space-x-3">
        <div className="no-scrollbar hidden items-center gap-x-1 overflow-x-auto sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="m-1 rounded-md px-3 py-1.5 text-sm font-medium text-ink-2 transition hover:bg-bg-alt hover:text-ink"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header