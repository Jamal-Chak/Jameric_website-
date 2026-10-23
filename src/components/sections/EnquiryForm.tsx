import { useState } from 'react';

interface Props { initialService?: string; }

export default function EnquiryForm({ initialService }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || 'generator-repairs');
  const [model, setModel] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setStatus('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, model, message, honeypot }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus(data.error || 'Submission failed. Please try again.');
      } else if (data.mode === 'preview') {
        setStatus('Preview only — no email was sent.');
      } else {
        setStatus('Your enquiry has been submitted. Please call if you need to follow up.');
      }
    } catch {
      setStatus('Network error. Please try again or call us.');
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h3>Send an enquiry</h3>
      <p>Your contact details are used to respond to your enquiry.</p>
      <div className="field"><label>Name</label><input value={name} onChange={(e)=>setName(e.target.value)} required maxLength={100} /></div>
      <div className="field"><label>Email</label><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required maxLength={200} /></div>
      <div className="field"><label>Phone (optional)</label><input value={phone} onChange={(e)=>setPhone(e.target.value)} maxLength={50} /></div>
      <div className="field"><label>Service</label>
        <select value={service} onChange={(e)=>setService(e.target.value)}>
          <option value="generator-repairs">Generator repairs</option>
          <option value="generator-servicing">Generator servicing</option>
          <option value="fault-finding">Fault finding</option>
          <option value="general">General enquiry</option>
        </select>
      </div>
      <div className="field"><label>Make/model (optional)</label><input value={model} onChange={(e)=>setModel(e.target.value)} maxLength={150} /></div>
      <div className="field"><label>Message</label><textarea value={message} onChange={(e)=>setMessage(e.target.value)} required maxLength={2000} /></div>
      <input type="text" name="honeypot" value={honeypot} onChange={(e)=>setHoneypot(e.target.value)} style={{display:'none'}} tabIndex={-1} autoComplete="off" />
      <button className="btn dark full" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Submit enquiry'}</button>
      {status && <p className="status-text" role="status">{status}</p>}
    </form>
  );
}
