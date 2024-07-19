import React, {useState} from 'react';

const FAQ = () => {
  const [showMore, setShowMore] = useState(false);

  // Static array of FAQs
  const faqs = [
    {
      question: 'What if I want to exchange or return my order?',
      answer:
        'Exchange and returns are available for products within 48 hours of delivery. Items must be in original condition with all tags intact.',
    },
    {
      question: 'Will I Receive a Quality Product by Pallod Store?',
      answer:
        'As an international brand, we adhere to strict quality and design benchmarks. Every Pallod product goes through a 5-step Quality Control process to ensure that you receive the best.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Delivery times vary depending on your location. Typically, delivery within the country takes 3-5 business days, while international deliveries may take 7-10 business days.',
    },
    {
      question: 'How can I track my order?',
      answer:
        "You can track your order using the tracking number provided in the confirmation email. Visit our website and enter the tracking number in the 'Track Order' section.",
    },
  ];

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="faqAccordion">
        <button
          className="accordion-button ps-0 collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseFaq"
          aria-expanded="false"
          aria-controls="collapseFaq"
        >
          FAQ
        </button>
      </h2>
      <div
        id="collapseFaq"
        className="accordion-collapse collapse"
        aria-labelledby="faqAccordion"
        data-bs-parent="#detailsAccordion"
      >
        <div className="accordion-body p-0 faq-section">
          {faqs.slice(0, showMore ? faqs.length : 2).map((faq, index) => (
            <div key={index}>
              <div className="faq-question">{`Q. ${faq.question}`}</div>
              <div className="faq-answer">{`A. ${faq.answer}`}</div>
            </div>
          ))}
          {/* Toggle 'View More'/'View Less' */}
          {faqs.length > 2 && (
            <div
              className="view-more-faq"
              onClick={toggleShowMore}
              style={{cursor: 'pointer'}}
            >
              {showMore ? 'VIEW LESS FAQs' : 'VIEW MORE FAQs'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
