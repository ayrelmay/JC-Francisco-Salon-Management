const Contact = () => (
  <div className="bg-bgcSec py-20">
    <h2 className="text-3xl font-bold text-black text-center mb-10">
      Contact Us
    </h2>
    <div className="text-center">
      <p className="text-lg text-black mb-2">
        Address: 123 Beauty Street, Glamour City
      </p>
      <p className="text-lg text-black mb-2">
        Phone:{" "}
        <a href="tel:+1234567890" className="text-BtnPrimary hover:underline">
          +123 456 7890
        </a>
      </p>
      <p className="text-lg text-black mb-2">
        Email:{" "}
        <a
          href="mailto:info@salon.com"
          className="text-BtnPrimary hover:underline"
        >
          info@salon.com
        </a>
      </p>
      <div className="mt-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-BtnPrimary hover:underline"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-BtnPrimary hover:underline"
        >
          Instagram
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-BtnPrimary hover:underline"
        >
          Twitter
        </a>
      </div>
      <p className="text-sm text-black mt-6">
        &copy; 2024 Salon. All rights reserved.
      </p>
    </div>
  </div>
);

export default Contact;
