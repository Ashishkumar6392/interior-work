const phone = '919867299859';
const enquiryEmail = 'ashish639263@gmail.com';
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.querySelectorAll('[data-service]').forEach(btn => {
  btn.addEventListener('click', () => {
    const service = btn.dataset.service;
    const text = `Hello Rajkumar ji, I need an estimate for ${service}. My location is: `;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
});

document.getElementById('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const service = document.getElementById('service').value;
  const location = document.getElementById('location').value.trim();
  const details = document.getElementById('details').value.trim();
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const message = [
    'Hello Rajkumar ji, I would like an estimate.',
    '',
    `Name: ${name}`,
    `Mobile: ${mobile}`,
    `Work Required: ${service}`,
    `Location: ${location}`,
    `Details: ${details || 'Not provided'}`
  ].join('\n');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formStatus.textContent = 'Sending enquiry to email...';

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(enquiryEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        mobile,
        service,
        location,
        details: details || 'Not provided',
        _subject: `New Website Enquiry - ${service}`,
        _template: 'table',
        _captcha: 'false'
      })
    });

    if (!response.ok) throw new Error('Email service returned an error');

    formStatus.textContent = 'Email sent. Opening WhatsApp...';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    e.target.reset();
  } catch (err) {
    console.error(err);
    formStatus.textContent = 'Email could not be sent automatically. Opening WhatsApp so the enquiry is not lost.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Enquiry';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
