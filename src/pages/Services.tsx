import PageMeta from '../components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function Services() {
  return (
    <>
      <PageMeta title="Services | Jameric Generator Repairs & Service" description="Generator repairs, servicing and fault finding in Germiston, Gauteng." />
      <div className="container page-hero">
        <div className="breadcrumb">Services</div>
        <h1>Generator repairs and servicing.</h1>
        <p>Choose a service to learn more, or call to discuss what’s happening with your equipment.</p>
      </div>
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="services-grid">
          {services.map((s, i) => (
            <article className="service-card" key={s.slug}>
              <div className="num">0{i + 1} <span>↗</span></div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <Link className="link" to={s.route}>Learn more →</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
