import PageMeta from '../components/seo/PageMeta';

export default function About() {
  return (
    <>
      <PageMeta title="About | Jameric Generator Repairs & Service" description="About Jameric Generator Repairs and Service in Germiston, Gauteng." />
      <div className="container page-hero">
        <div className="breadcrumb">About</div>
        <h1>About Jameric Generator Repairs and Service.</h1>
        <p>Based in Germiston, Gauteng, focused on helping customers with generator repairs and servicing.</p>
      </div>
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="about-block">
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
    </>
  );
}
