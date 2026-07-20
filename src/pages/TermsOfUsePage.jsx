import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function TermsOfUsePage() {
  const { theme } = useContext(ThemeContext);

  const sectionClasses = `mb-10 p-6 rounded-2xl transition-all duration-300 ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-blue-100 shadow-md'
  }`;

  const headingClasses = `text-xl font-bold mb-4 ${
    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
  }`;

  const textClasses = `text-sm md:text-base leading-relaxed ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className={`max-w-4xl mx-auto py-12 px-6 transition-colors duration-500 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <header className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Terms of Use</h1>
        <div className={`h-1 w-20 mx-auto rounded-full bg-blue-600 mb-6`}></div>
        <p className={`text-lg opacity-80 max-w-2xl mx-auto`}>
          Guidelines for interacting with The Developer's Blog.
        </p>
      </header>

      <div className="space-y-8">
        <section className={sectionClasses}>
          <h2 className={headingClasses}>1. Acceptance of Terms</h2>
          <p className={textClasses}>
            By accessing and using The Developer's Blog, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please refrain from using the platform. These terms apply to all visitors, users, and others who access the service.
          </p>
        </section>

        <section className={sectionClasses}>
          <h2 className={headingClasses}>2. Content Ownership</h2>
          <p className={textClasses}>
            All content published on this blog, including text, graphics, logos, and code snippets, is the intellectual property of the individual developer and creator of this site, unless otherwise stated. You may share and reference the content for educational and non-commercial purposes, provided that proper attribution is given to the original source.
          </p>
        </section>

        <section className={sectionClasses}>
          <h2 className={headingClasses}>3. User Conduct</h2>
          <p className={textClasses}>
            Users are expected to interact with the platform in a respectful and lawful manner. Prohibited activities include, but are not limited to: attempting to bypass security measures, scraping content without permission, or using the platform to distribute malicious software. We reserve the right to restrict access to any user who violates these principles.
          </p>
        </section>

        <section className={sectionClasses}>
          <h2 className={headingClasses}>4. Disclaimer of Liability</h2>
          <p className={textClasses}>
            The information provided on this blog is for educational and informational purposes only. While I strive for accuracy, the content is provided "as is" without any warranties. The individual developer shall not be held liable for any damages or losses resulting from the use of the information or tools provided on this site.
          </p>
        </section>

        <section className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className={textClasses}>
            Thank you for being part of this learning community.
          </p>
          <p className="mt-4 text-xs opacity-50 italic">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsOfUsePage;
