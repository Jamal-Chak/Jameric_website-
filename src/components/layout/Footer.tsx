import { useState } from 'react';
import { business } from '../../data/business';

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear());
  return (
    <footer className="site-footer">
      <span>© {year} Jameric Generator Repairs and Service</span>
      <span>
        {business.location} · <a href={business.phoneHref}>{business.phoneDisplay}</a>
      </span>
    </footer>
  );
}

