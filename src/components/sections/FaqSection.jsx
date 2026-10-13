import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getPublishedFaqs } from "../../admin/services/faqsService.js";
import { useCmsContent } from "../../hooks/useCmsContent.js";
import Reveal from "../common/Reveal.jsx";

const FaqSection = () => {
  const [openId, setOpenId] = useState(null);
  useCmsContent();
  const faqs = getPublishedFaqs();

  return (
    <Reveal as="section" className="faq-section">
      <div>
        <div className="eyebrow blue">BEFORE WE TALK</div>
        <h2>A few useful answers.</h2>
      </div>
      <div>
        {faqs.map((item) => {
          const isOpen = openId === item.id;
          return (
            <details
              key={item.id}
              open={isOpen}
              onToggle={(event) => {
                if (event.currentTarget.open) setOpenId(item.id);
                else if (openId === item.id) setOpenId(null);
              }}
            >
              <summary>
                {item.question}
                <ChevronDown size={18} />
              </summary>
              <p>{item.answer}</p>
            </details>
          );
        })}
      </div>
    </Reveal>
  );
};

export default FaqSection;
