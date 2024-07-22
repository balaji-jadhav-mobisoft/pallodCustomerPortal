import {useLoaderData} from '@remix-run/react';
import {useState} from 'react';

const FAQ = ({faqBlog}) => {
  if (!faqBlog) return null;
  const [showMore, setShowMore] = useState(false);

  const faqs = faqBlog?.blog?.articles?.edges?.map(
    (edge) => edge.node.contentHtml,
  );

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
          {/* Render the FAQ content */}
          <div dangerouslySetInnerHTML={{__html: faqs[0]}}></div>
          {showMore &&
            faqs
              .slice(1)
              .map((faq, index) => (
                <div key={index} dangerouslySetInnerHTML={{__html: faq}}></div>
              ))}
          {/* Toggle 'View More'/'View Less' */}
          {faqs.length > 1 && (
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
