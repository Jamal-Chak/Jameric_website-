import PageMeta from '../components/seo/PageMeta';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found | Jameric" description="The requested page could not be found." />
      <div className="container notfound">
      <h1>404</h1>
      <p>That page doesn’t exist.</p>
      <Link className="btn dark" to="/">Back home</Link>
      </div>
    </>
  );
}
