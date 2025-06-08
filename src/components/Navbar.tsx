import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Madjik
        </Link>
      </div>
    </nav>
  );
}
