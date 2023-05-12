import { Link, useLocation } from "react-router-dom";

const items = [
  { to: '/', title: 'Home' },
  { to: '/auth', title: 'Auth' },
]

export default function AppSidebar() {
  const pathname = useLocation().pathname

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
    >
    <span className="fs-4">
      Inventory CMS
    </span>
    
    <hr />
    
    <ul className="nav nav-pills flex-column mb-auto">
      {items.map(_ => 
        <li
          className={pathname == _.to ? 'nav-item' : ''} 
          key={_.to}>
          <Link
            to={_.to} 
            className={`nav-link text-white ${pathname == _.to ? 'active' : ''}`}>
            {_.title}
          </Link>
        </li>
      )}
    </ul>
  </div>
  )
}
