import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap">
          </Link>
          <span className="mb-3 mb-md-0 text-body-secondary">© 2025 GoFood, Inc</span>
        </div>
      </footer>
  )
}
