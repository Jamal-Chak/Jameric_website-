import PageMeta from '../components/seo/PageMeta';
import { useParams, Link } from 'react-router-dom';
import { serviceBySlug } from '../data/services';
import EnquiryBuilder from '../components/sections/EnquiryBuilder';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = slug ? serviceBySlug(slug as any) : undefined;
  if (!service) {
    return (
      <>
        <PageMeta title="Service not found | Jameric" description="The requested service could not be found." />
        <div className="container notfound">
          <h1>Service not found</h1>
          <p>The requested service does not exist.</p>
          <Link className="btn dark" to="/services">View all services</Link>
        </div>
      </>
    );
  }
  return (
    <>
      <PageMeta title={`${service.title} | Jameric`} description={service.description} />
      <div className="container page-hero">
        <div className="breadcrumb">Services / {service.title}</div>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
      </div>
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="detail-grid">
          <div className="detail-card">
            <h3>Common symptoms</h3>
            <ul>{service.symptoms.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="detail-card">
            <h3>What to prepare</h3>
            <ul>{service.prepare.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
        <div className="detail-card" style={{ marginTop: 32 }}>
          <h3>Next steps</h3>
          <ul>{service.nextSteps.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn ghost" to="/services">← All services</Link>
        </div>
      </section>
      <section className="contact-section">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow"><i className="dot" /> Enquire about {service.title.toLowerCase()}</div>
            <h2>Ready to talk?</h2>
            <p>Build a short summary below and share it with Jameric.</p>
          </div>
          <EnquiryBuilder initialService={service.title} />
        </div>
      </section>
    </>
  );
}
