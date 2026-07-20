import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function DataPrivacyPage() {
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
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Data Privacy Policy</h1>
        <div className={`h-1 w-20 mx-auto rounded-full bg-blue-600 mb-6`}></div>
        <p className={`text-lg opacity-80 max-w-2xl mx-auto`}>
          Your privacy is paramount. This document outlines how we handle information on this platform.
        </p>
      </header>

      <div className="space-y-8">
        <section className={sectionClasses}>
          <h2 className={headingClasses}>1. Individual Management</h2>
          <p className={textClasses}>
            This blog and Content Management System is a personal project, solely managed and maintained by an individual developer. Unlike large-scale platforms, there is no corporate entity, data processing department, or external team involved in the handling of your interaction with this site. This ensures a direct and transparent relationship between the content creator and the audience. Every piece of code and database entry is overseen with personal accountability.
          </p>
        </section>

        <section className={sectionClasses}>
          <h2 className={headingClasses}>2. Zero Data Commercialization</h2>
          <p className={textClasses}>
            We operate on a strictly non-commercial basis regarding user data. There is absolutely no exchange, trading, or selling of user information to third-party advertisers, data brokers, or marketing agencies. Your digital footprint on this blog is not a product. We believe that your interests, reading habits, and subscription details are private and should remain so, without being leveraged for profit or targeted advertising.
          </p>
        </section>

        <section className={sectionClasses}>
          <h2 className={headingClasses}>3. Data Export & Portability</h2>
          <p className={textClasses}>
            In line with our commitment to simplicity and security, we do not engage in data export practices. Your information is stored within our secure, isolated database environment solely for the purpose of providing the blog's services—such as account management and newsletter subscriptions. We do not transmit this data across borders or to external storage providers beyond the core infrastructure required to host the site.
          </p>
        </section>

        <section className={sectionClasses}>
          <h2 className={headingClasses}>4. Information We Collect</h2>
          <p className={textClasses}>
            The information collected is minimal and intentional. For subscribers, we store the email address provided to deliver updates. For registered users, we maintain profile information (like display names and profile pictures) to personalize your experience. This data is provided voluntarily by you. We do not use invasive tracking technologies or "shadow profiles" to gather information without your explicit interaction with the platform.
          </p>
        </section>

        <section className={sectionClasses}>
          <h2 className={headingClasses}>5. Security & Accountability</h2>
          <p className={textClasses}>
            As the sole handler of this platform, I implement industry-standard security measures to protect the integrity of the database. While no system is entirely infallible, the absence of complex third-party integrations significantly reduces the "attack surface" for potential data breaches. If at any point you wish to have your data removed from our records, we provide straightforward mechanisms to do so, reflecting our respect for your right to be forgotten.
          </p>
        </section>

        <section className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className={textClasses}>
            By using this website, you acknowledge and agree to this individual-led approach to data privacy.
          </p>
          <p className="mt-4 text-xs opacity-50 italic">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
}

export default DataPrivacyPage;
