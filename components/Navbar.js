import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand">Event Planner</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/venues" className="nav-link">Venues</Link>
            </li>
            <li className="nav-item">
              <Link href="/musicians" className="nav-link">Musicians</Link>
            </li>
            <li className="nav-item">
              <Link href="/caterers" className="nav-link">Caterers</Link>
            </li>
            <li className="nav-item">
              <Link href="/photographers" className="nav-link">Photographers</Link>
            </li>
            <li className="nav-item">
              <Link href="/videographers" className="nav-link">Videographers</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
