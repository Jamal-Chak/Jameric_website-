import PageMeta from '../components/seo/PageMeta';
import { useSearchParams } from 'react-router-dom';
import { business } from '../data/business';
import { services } from '../data/services';
import EnquiryBuilder from '../components/sections/EnquiryBuilder';
import EnquiryForm from '../components/sections/EnquiryForm';

export default function Contact() {
  const [params] = useSearchParams();
  const slug = params.get('service');
  const service = slug ? services.find((s) => s.slug === slug) : undefined;
  const initialService = service ? service.title : undefined;
  return (
    <>
      <PageMeta title='Contact Jameric Generator Repairs and Service' description='Contact Jameric for generator repairs and servicing.' />
      <section className='contact-section'>
        <div className='container contact-grid'>
          <div>
            <div className='eyebrow'><i className='dot' /> Talk to Jameric</div>
            <h2>Power problems? Let us talk.</h2>
            <p>Call us to discuss a repair, ask about servicing or confirm your visit.</p>
            <a className='phone' href={business.phoneHref}>{business.phoneDisplay}</a>
            <small>{business.location}<br />Please call to confirm the workshop address and opening hours.</small>
          </div>
          <div>
            <EnquiryForm initialService={initialService} />
            <EnquiryBuilder initialService={initialService} />
          </div>
        </div>
      </section>
    </>
  );
}
