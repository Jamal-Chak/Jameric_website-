import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { business } from '../../data/business';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);


  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const goSection = (hash: string) => {
    if (location.pathname !== '/') navigate('/' + hash);
    else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" to="/">
          <b>ϟ</b>
          <span>JAMERIC<small>Generator repairs & service</small></span>
        </Link>
        <div className="links">
          <button className="link-btn" onClick={() => goSection('#services')} style={{background:'none',border:0,cursor:'pointer',font:'inherit',padding:0}}>Our services</button>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>About Jameric</Link>
          <button className="link-btn" onClick={() => goSection('#process')} style={{background:'none',border:0,cursor:'pointer',font:'inherit',padding:0}}>How it works</button>
        </div>
        <a className="btn dark" href={business.phoneHref}>Call us <span>↗</span></a>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>☰</button>
      </nav>
      {open && (
        <div className="mobile-nav open">
          <button onClick={() => { goSection('#services'); }} style={{background:'none',border:0,textAlign:'left',font:'inherit',cursor:'pointer',padding:0}}>Our services</button>
          <Link to="/about" onClick={() => setOpen(false)} className={isActive('/about') ? 'active' : ''}>About Jameric</Link>
          <button onClick={() => { goSection('#process'); }} style={{background:'none',border:0,textAlign:'left',font:'inherit',cursor:'pointer',padding:0}}>How it works</button>
          <Link to="/services" onClick={() => setOpen(false)} className={isActive('/services') ? 'active' : ''}>All services</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className={isActive('/contact') ? 'active' : ''}>Contact</Link>
        </div>
      )}
    </header>
  );
}
