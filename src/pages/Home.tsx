import PageMeta from '../components/seo/PageMeta';
import generatorSvg from '../assets/generator.svg?raw';
import EnquiryBuilder from '../components/sections/EnquiryBuilder';
import { business } from '../data/business';
import { services } from '../data/services';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <PageMeta title="Jameric Generator Repairs & Service | Home" description="Generator repairs and servicing in Germiston, Gauteng." />
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow"><i className="dot" /> Generator care · Germiston</div>
            <h1>Keep your power.<br /><em>Get back to<br />what matters.</em></h1>
            <p className="lead">Generator trouble shouldn’t stop your day. Talk to Jameric about repairs and servicing for your generator.</p>
            <div className="actions">
              <Link className="btn" to="/contact">Discuss a repair <span>↗</span></Link>
              <a className="btn outline" href="#services">Explore services <span>↓</span></a>
            </div>
            <div className="hero-foot">
              <span>✓ Repairs & fault finding</span>
              <span>✓ Generator servicing</span>
            </div>
          </div>
          <div className="visual">
            <div className="visual-label"><span>POWER. RESTORED.</span><span>01 / GENERATOR CARE</span></div>
            <div dangerouslySetInnerHTML={{ __html: generatorSvg }} />
          </div>
        </div>
      </section>

      <div className="strip"><span>GENERATOR REPAIRS</span><span>FAULT FINDING</span><span>ROUTINE SERVICING</span></div>

      <section className="container section" id="services">
        <div className="section-head">
          <div>
            <div className="eyebrow">01 / What we do</div>
            <h2>A better running generator<br />starts with the right care.</h2>
          </div>
          <p>From a generator that won’t start to a service that’s overdue, tell us what’s happening and we’ll discuss the next step.</p>
        </div>
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
        <div className="about-block" id="about">
          <div>
            <div className="eyebrow">Local service. Practical support.</div>
            <h2>Your generator.<br />Our focus.</h2>
          </div>
          <div>
            <p>Jameric Generator Repairs and Service is based in Germiston, Gauteng. We focus on helping customers with generator repairs and servicing.</p>
            <div className="check-list">
              <div className="check"><span>↗</span> Speak directly with the business</div>
              <div className="check"><span>↗</span> Discuss your equipment and service needs</div>
              <div className="check"><span>↗</span> Confirm arrangements before your visit</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section" id="process" style={{ paddingTop: 0 }}>
        <div className="eyebrow">02 / Getting started</div>
        <h2>Let’s get things running.</h2>
        <div className="steps-grid">
          <article className="step-card">
            <strong>STEP 01</strong>
            <h3>Tell us the problem</h3>
            <p>Have your generator’s make, model and symptoms ready. Photos and fault codes can help explain the issue.</p>
          </article>
          <article className="step-card">
            <strong>STEP 02</strong>
            <h3>Discuss the next step</h3>
            <p>Call to confirm service availability, assessment arrangements and where to bring your equipment.</p>
          </article>
          <article className="step-card">
            <strong>STEP 03</strong>
            <h3>Agree on the work</h3>
            <p>Discuss the proposed repair or service, costs and expected timing directly with Jameric.</p>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow"><i className="dot" /> 03 / Talk to Jameric</div>
            <h2>Power problems?<br />Let’s talk.</h2>
            <p>Call us to discuss a repair, ask about servicing or confirm your visit.</p>
            <a className="phone" href={business.phoneHref}>{business.phoneDisplay} ↗</a>
            <small>{business.location}<br />Please call to confirm the workshop address and opening hours.</small>
          </div>
          <EnquiryBuilder />
        </div>
      </section>
    </>
  );
}
