import * as React from "react";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="flex flex-col mb-8">
      <dt className="font-bold text-[#a1b1b6] mb-2 text-lg">
        {question}
      </dt>
      <dd className="ml-0 text-[#a1b1b6] leading-relaxed">
        {answer}
      </dd>
    </div>
  );
}
