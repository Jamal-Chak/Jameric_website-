import { useState } from 'react';
import { services } from '../../data/services';

interface Props {
  initialService?: string;
}

export default function EnquiryBuilder({ initialService = '' }: Props) {
  const [service, setService] = useState(initialService || services[0].title);
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) {
      setStatus('Please describe your enquiry.');
      return;
    }
    const text =
      'Hello Jameric, I would like to enquire about ' + service.toLowerCase() + '.\n' +
      (model.trim() ? 'Generator: ' + model.trim() + '\n' : '') +
      'Details: ' + issue.trim() + '\n' +
      'Please let me know the next steps and your availability.';
    setSummary(text);
    setStatus('');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus('Copied. You can now paste this into your preferred messaging app.');
    } catch {
      setStatus('Select and copy the summary above.');
    }
  };

  return (
    <form className="form" id="enquiry" onSubmit={onSubmit} noValidate>
      <h3>Prepare your enquiry</h3>
      <p>Build a short summary to copy and share with Jameric. This form does not send a message.</p>
      <div className="field">
        <label htmlFor="service">What do you need?</label>
        <select id="service" value={service} onChange={(e) => setService(e.target.value)}>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>General enquiry</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="model">Generator make / model (optional)</label>
        <input id="model" maxLength={150} placeholder="e.g. make, model and kVA rating" value={model} onChange={(e) => setModel(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="issue">Tell us what’s happening</label>
        <textarea id="issue" required maxLength={2000} placeholder="Describe the fault or service you need…" value={issue} onChange={(e) => { setIssue(e.target.value); if (status && e.target.value.trim()) setStatus(''); }} />
      </div>
      <button className="btn dark full" type="submit">Create enquiry summary <span>↗</span></button>
      {summary && (
        <div id="output">
          <div className="result" id="summary" aria-live="polite">{summary}</div>
          <button className="btn" id="copy" type="button" onClick={copy}>Copy enquiry</button>
          <p className="status-text" id="copy-status" role="status">{status}</p>
        </div>
      )}
      {!summary && status && <p className="status-text" role="status">{status}</p>}
      <div className="notice">This tool prepares a summary for you to copy. It does not send a message or store your details.</div>
    </form>
  );
}
