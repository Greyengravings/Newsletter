const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const sampleBlogs = [


  // 2. AI & ML
  {
    title: 'Mastering Machine Learning Algorithms: From Regression to Neural Networks',
    excerpt: 'A foundational roadmap to understanding predictive modeling, supervised learning, and deep neural nets.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-01'),
    author: 'Data Scientist Pro',
    category: 'AI & ML',
    content: `
      <p class="lead">Machine Learning algorithms power everything from recommendation engines to autonomous vehicles.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Core Model Architectures</h3>
      <p>Understanding linear regression, decision trees, and convolutional neural networks is key to building intelligent applications.</p>
    `,
  },
  {
    title: 'Generative AI in 2025: Beyond LLMs to Multimodal Autonomous Agents',
    excerpt: 'Discover how modern AI agents execute complex multi-step workflows with vision, voice, and tool use.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-15'),
    author: 'AI Researcher',
    category: 'AI & ML',
    content: `
      <p class="lead">AI is transitioning from text prompts to autonomous agents capable of interacting with software APIs directly.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Agentic Workflows</h3>
      <p>By pairing reasoning models with browser automation and API execution, AI agents can solve multi-step engineering tasks end-to-end.</p>
    `,
  },

  // 3. Business & Finance
  {
    title: 'Navigating Personal Finance: Smart Investment Strategies for Young Professionals',
    excerpt: 'Essential advice on budgeting, index funds, compound growth, and building long-term financial security.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-04-18'),
    author: 'Finance Strategist',
    category: 'Business & Finance',
    content: `
      <p class="lead">Building wealth early starts with discipline, emergency funds, and consistent low-cost index investing.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">The Eighth Wonder of the World</h3>
      <p>Compound interest rewards patience. Automating investments ensures long-term asset accumulation regardless of market noise.</p>
    `,
  },
  {
    title: 'The Rise of Fintech Innovation: How Digital Banking is Reshaping Commerce',
    excerpt: 'An overview of UPI payments, decentralized finance, micro-loans, and the future of global banking.',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-08-02'),
    author: 'Market Analyst',
    category: 'Business & Finance',
    content: `
      <p class="lead">Financial technology has democratized payments, enabling instant cross-border transactions and frictionless commerce.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Digital Payments Revolution</h3>
      <p>From mobile wallets to neo-banks, financial services are becoming invisible, integrated directly into daily apps.</p>
    `,
  },

  // 4. Coding
  {
    title: 'Clean Code Principles: Writing Maintainable and Scalable JavaScript',
    excerpt: 'Best practices for writing readable, self-documenting, and bug-resistant JavaScript and TypeScript code.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-03-22'),
    author: 'Senior Software Eng',
    category: 'Coding',
    content: `
      <p class="lead">Writing code that works is easy; writing code that your team can read six months later requires mastery.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">SOLID Principles & Refactoring</h3>
      <p>Focus on single responsibility functions, descriptive variable names, and reducing side effects to produce maintainable codebases.</p>
    `,
  },
  {
    title: 'Data Structures and Algorithms Demystified: Trees, Graphs, and Dynamic Programming',
    excerpt: 'Master fundamental computer science concepts to solve complex engineering problems and ace technical interviews.',
    imageUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-30'),
    author: 'Algo Master',
    category: 'Coding',
    content: `
      <p class="lead">Data structures provide the building blocks for efficient software, enabling fast search, traversal, and memory management.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Algorithmic Efficiency</h3>
      <p>Understanding Big O notation allows developers to optimize memory and time complexity for large-scale data applications.</p>
    `,
  },

  // 5. Productivity
  {
    title: 'The Pomodoro & Time-Blocking Framework: Doubling Your Daily Output',
    excerpt: 'Transform your daily workflow using structured focus sessions, deep work blocks, and distraction elimination.',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-01-20'),
    author: 'Productivity Hacker',
    category: 'Productivity',
    content: `
      <p class="lead">Focus is a finite resource. Structuring your workday into deep work blocks boosts creative and analytical output.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Deep Work vs Shallow Work</h3>
      <p>By scheduling non-negotiable blocks for core priorities, you eliminate reactive context-switching and accomplish meaningful goals.</p>
    `,
  },
  {
    title: 'Building a Second Brain: Digital Knowledge Management with Notion and Obsidian',
    excerpt: 'Learn how to capture, organize, and synthesize ideas to supercharge your learning and creative output.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-18'),
    author: 'Knowledge Architect',
    category: 'Productivity',
    content: `
      <p class="lead">Your brain is for having ideas, not storing them. A digital second brain acts as a permanent personal knowledge hub.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">The CODE Method</h3>
      <p>Capture what resonates, Organize by actionability, Distill the key insights, and Express your unique creative synthesis.</p>
    `,
  },

  // 6. Web Dev
  {
    title: 'A Deep Dive into React 19: Actions, Server Components, and Optimistic UI',
    excerpt: 'Explore the game-changing features of React 19 including useActionState, useOptimistic, and compiler optimizations.',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-10'),
    author: 'Frontend Architect',
    category: 'Web Dev',
    content: `
      <p class="lead">React 19 brings simplified state management, server actions, and automated memoization to modern web apps.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Seamless Form Handling & Actions</h3>
      <p>Server actions streamline data mutations and form submissions without boilerplate event handlers or manual loading flags.</p>
    `,
  },
  {
    title: 'Modern CSS Architecture: Tailwind CSS v4, CSS Grid, and Container Queries',
    excerpt: 'Unlock responsive layout techniques with Tailwind v4, subgrid support, and modern CSS features.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-28'),
    author: 'CSS Wizard',
    category: 'Web Dev',
    content: `
      <p class="lead">CSS has evolved dramatically. Container queries allow components to respond dynamically to their parent's width rather than viewport size.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Next-Gen Styling</h3>
      <p>Combining utility-first Tailwind CSS with modern Grid and Flexbox yields bulletproof, maintainable responsive user interfaces.</p>
    `,
  },

  // 7. Design
  {
    title: 'The Psychology of Color in Visual Design and Branding',
    excerpt: 'How color choices influence user perception, emotional response, and brand trust across web and mobile platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-02-14'),
    author: 'Brand Designer',
    category: 'Design',
    content: `
      <p class="lead">Color is one of the most powerful communication tools in design, conveying trust, urgency, or elegance instantly.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Visual Harmony & Contrast</h3>
      <p>Effective color palettes balance contrast ratios for accessibility while maintaining visual identity and brand recognition.</p>
    `,
  },
  {
    title: 'Design Systems in Action: Bridging the Gap Between Designers and Developers',
    excerpt: 'How reusable tokenized component libraries unify design language and accelerate product development.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-19'),
    author: 'UX Lead',
    category: 'Design',
    content: `
      <p class="lead">A design system is a single source of truth containing design tokens, UI components, and brand guidelines.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Component Reusability</h3>
      <p>By standardizing typography, spacing, and interactive states, teams ship features faster with zero visual inconsistency.</p>
    `,
  },

  // 8. Digital Marketing
  {
    title: 'SEO Strategies for 2025: Ranking High in the AI Search Overview Era',
    excerpt: 'Adapt your content strategy to generative search engines, E-E-A-T principles, and authoritative topic clusters.',
    imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-04-05'),
    author: 'Growth Specialist',
    category: 'Digital Marketing',
    content: `
      <p class="lead">Search engine optimization is shifting toward deep topical authority, user intent fulfillment, and original insights.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">E-E-A-T & Quality Signals</h3>
      <p>Experience, Expertise, Authoritativeness, and Trustworthiness are key to standing out in AI-synthesized search results.</p>
    `,
  },
  {
    title: 'Content Marketing Mastery: Building an Engaged Organic Audience from Scratch',
    excerpt: 'Learn how to create high-value blogs, newsletters, and social content that convert casual readers into brand loyalists.',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-02'),
    author: 'Content Strategist',
    category: 'Digital Marketing',
    content: `
      <p class="lead">Great content marketing provides actionable value long before asking for a sale or subscription.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">The Audience Engine</h3>
      <p>Consistency, storytelling, and listening to user feedback form the backbone of sustainable organic growth.</p>
    `,
  },

  // 9. Full Stack
  {
    title: 'Getting Started with Full Stack Development: A Beginner\'s Roadmap',
    excerpt: 'A comprehensive roadmap for aspiring full stack developers, covering frontend, backend, databases, and APIs.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-03-05'),
    author: 'Dev Learner',
    category: 'Full Stack',
    content: `
      <p class="lead">Full stack development offers the opportunity to build complete end-to-end web applications independently.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Understanding the MERN Stack</h3>
      <p>Combining MongoDB, Express, React, and Node provides a JavaScript-powered ecosystem across client and server.</p>
    `,
  },
  {
    title: 'Building Scalable RESTful & GraphQL APIs with Node.js and Express',
    excerpt: 'Learn route design, authentication middleware, error handling, and database indexing for production APIs.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-25'),
    author: 'Backend Lead',
    category: 'Full Stack',
    content: `
      <p class="lead">APIs serve as the connective tissue between frontend interfaces and database backends.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Robust API Design</h3>
      <p>Proper rate-limiting, JWT authentication, and structured error payloads guarantee reliability under heavy traffic load.</p>
    `,
  },

  // 10. Travel & Adventure
  {
    title: 'Exploring Scandinavia: A Guide to the Fjords and Northern Lights',
    excerpt: 'Discover the breathtaking natural beauty and minimalist charm of Norway, Sweden, and Denmark.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-20'),
    author: 'Global Nomad',
    category: 'Travel & Adventure',
    content: `
      <p class="lead">There is a specific silence found in the Scandinavian wilderness under the Aurora Borealis.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Majestic Fjords and Cozy Hygge</h3>
      <p>From Geirangerfjord to Copenhagen’s vibrant harbor, Scandinavian travel blends nature with sustainable urban living.</p>
    `,
  },
  {
    title: 'Backpacking Across Southeast Asia: Hidden Gems and Budget Travel Tips',
    excerpt: 'Navigating Vietnam, Thailand, and Indonesia on a budget with rich culture and stunning landscapes.',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-08-10'),
    author: 'Wanderlust Explorer',
    category: 'Travel & Adventure',
    content: `
      <p class="lead">Southeast Asia offers an unmatched blend of rich history, night markets, pristine beaches, and warm hospitality.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Off-the-Beaten-Path</h3>
      <p>Venturing beyond tourist centers reveals serene mountain towns, ancient temples, and unforgettable local cuisine.</p>
    `,
  },

  // 11. Data Science
  {
    title: 'Data Visualization with Python: Transforming Raw Metrics into Compelling Visual Insights',
    excerpt: 'Master Pandas, Matplotlib, Seaborn, and Plotly to build interactive dashboards and data stories.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzt27MjSQ8WKuYZOw5lzGbROGfSNuB-sYXprB1ztzNfuanuPJ9jlWELc&s=10',
    createdAt: new Date('2024-05-08'),
    author: 'Data Analyst',
    category: 'Data Science',
    content: `
      <p class="lead">Data visualization bridges complex statistical computation and actionable business decisions.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Storytelling with Charting</h3>
      <p>Choosing the right chart type—heatmaps, scatter plots, or time-series curves—highlights core trends effortlessly.</p>
    `,
  },
  {
    title: 'Big Data Analytics: Harnessing Spark, SQL, and Predictive Modeling at Scale',
    excerpt: 'How processing millions of data points enables personalized recommendations and trend forecasts.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-22'),
    author: 'Data Engineer',
    category: 'Data Science',
    content: `
      <p class="lead">Big data pipelines ingest distributed streams to provide real-time operational metrics and business intelligence.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">ETL Pipelines</h3>
      <p>Clean data ingestion, feature engineering, and automated validation are critical prerequisites for reliable machine learning models.</p>
    `,
  },

  // 12. Health & Fitness
  {
    title: 'The Science of Strength Training: Maximizing Muscle Growth and Mobility Safely',
    excerpt: 'An evidence-based guide to progressive overload, proper form, recovery protocols, and joint longevity.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-03-12'),
    author: 'Fitness Coach',
    category: 'Health & Fitness',
    content: `
      <p class="lead">Strength training enhances metabolic health, bone density, and functional athletic movement across all ages.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Progressive Overload</h3>
      <p>Gradually increasing weight, reps, or control stimulates adaptation while prioritizing joint safety and proper form.</p>
    `,
  },
  {
    title: 'Nutrition Essentials: Balancing Macronutrients, Hydration, and Metabolic Health',
    excerpt: 'Demystifying proteins, complex carbs, healthy fats, and micronutrients for peak physical energy.',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-14'),
    author: 'Nutritionist',
    category: 'Health & Fitness',
    content: `
      <p class="lead">Fueling your body with whole foods sustains energy levels and speeds up athletic recovery.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Macronutrient Harmony</h3>
      <p>Understanding nutrient timing, adequate hydration, and gut health forms the foundation of lasting vitality.</p>
    `,
  },

  // 13. Cybersecurity
  {
    title: 'Zero Trust Architecture: Protecting Modern Distributed Cloud Infrastructure',
    excerpt: 'Why "never trust, always verify" is the essential security paradigm for modern web apps and enterprises.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-02-28'),
    author: 'Security Specialist',
    category: 'Cybersecurity',
    content: `
      <p class="lead">Traditional perimeter security is obsolete in an era of remote work and multi-cloud deployments.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Micro-segmentation & Identity</h3>
      <p>Zero Trust enforces strict identity verification, principle of least privilege, and encrypted communications everywhere.</p>
    `,
  },
  {
    title: 'Ethical Hacking 101: Understanding Penetration Testing and Vulnerability Assessment',
    excerpt: 'Learn how security researchers find OWASP Top 10 vulnerabilities like SQL injection and XSS before bad actors do.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-16'),
    author: 'Ethical Hacker',
    category: 'Cybersecurity',
    content: `
      <p class="lead">Ethical hackers simulate attacks to discover security flaws and patch systems before exploitation.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">OWASP Security Guidelines</h3>
      <p>Securing input fields, sanitizing queries, and implementing proper CORS headers prevents major security breaches.</p>
    `,
  },

  // 14. Lifestyle & Wellness
  {
    title: 'The Art of Mindful Living in a Hyper-Connected World',
    excerpt: 'Practical strategies to reclaim your focus, reduce stress, and find balance in the age of digital distractions.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-05'),
    author: 'Serenity Seeker',
    category: 'Lifestyle & Wellness',
    content: `
      <p class="lead">Continuous partial attention degrades peace of mind. Mindfulness reclaims presence and focus.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Digital Detox Rituals</h3>
      <p>Setting phone-free boundaries during meals and mornings restores focus and mental clarity.</p>
    `,
  },
  {
    title: 'Creating a Minimalist Living Space for Mental Clarity and Inner Peace',
    excerpt: 'How decluttering your physical environment leads to reduced stress, heightened focus, and intentional living.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-08-01'),
    author: 'Minimalist Guide',
    category: 'Lifestyle & Wellness',
    content: `
      <p class="lead">Your surroundings reflect your state of mind. Simplifying your space fosters daily calm and creativity.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Intentional Environment Design</h3>
      <p>Surrounding yourself only with items that serve a purpose or bring joy cultivates clarity and gratitude.</p>
    `,
  },

  // 15. Cloud
  {
    title: 'AWS vs Azure vs GCP: Choosing the Right Cloud Infrastructure Provider',
    excerpt: 'A detailed comparative breakdown of compute instances, serverless, managed Kubernetes, and pricing models.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-04-12'),
    author: 'Cloud Architect',
    category: 'Cloud',
    content: `
      <p class="lead">Selecting a cloud provider depends on workload requirements, ecosystem integration, and cost optimization.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Managed Services Comparison</h3>
      <p>AWS excels in breadth, Azure in enterprise ecosystem, and GCP in data analytics and AI infrastructure.</p>
    `,
  },
  {
    title: 'Serverless Architecture: Building Elastic Web Backends with Cloud Functions',
    excerpt: 'How serverless computing eliminates server management, offering automatic scaling and pay-per-execution pricing.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-10'),
    author: 'Serverless Pro',
    category: 'Cloud',
    content: `
      <p class="lead">Serverless lets developers deploy functions that scale instantly from zero to thousands of concurrent requests.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Event-Driven Architecture</h3>
      <p>Decoupling services through API Gateways and event queues reduces operational overhead and speeds up release cycles.</p>
    `,
  },

  // 16. Mobile Dev
  {
    title: 'Flutter vs React Native in 2025: Selecting the Ultimate Cross-Platform Framework',
    excerpt: 'Compare performance, developer experience, UI rendering, and community ecosystems for mobile app development.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-22'),
    author: 'Mobile Dev Lead',
    category: 'Mobile Dev',
    content: `
      <p class="lead">Cross-platform mobile frameworks allow shipping high-performance iOS and Android apps from a single codebase.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Native Performance & Graphics</h3>
      <p>Flutter’s Skia/Impeller engine offers pixel-perfect UI rendering, while React Native leverages native platform bridges.</p>
    `,
  },
  {
    title: 'iOS App Development with Swift & SwiftUI: Modern Principles for Native Apps',
    excerpt: 'Master declarative UI development, async/await concurreny, and Apple design guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-08-05'),
    author: 'Swift Developer',
    category: 'Mobile Dev',
    content: `
      <p class="lead">SwiftUI simplifies iOS user interfaces with reactive state binding and native Apple hardware performance.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Declarative UI Paradigm</h3>
      <p>Building screens with dynamic state updates produces smooth, animated, and accessible mobile experiences.</p>
    `,
  },

  // 17. Photography & Art
  {
    title: 'Mastering Golden Hour Photography: Composition, Lighting, and Color Calibration',
    excerpt: 'Capture dramatic landscapes and warm portraiture during sunrise and sunset lighting windows.',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-03-18'),
    author: 'Visual Artist',
    category: 'Photography & Art',
    content: `
      <p class="lead">Golden hour provides soft, directional, warm light that enhances depth and atmosphere in outdoor photography.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Framing and Exposure</h3>
      <p>Utilizing leading lines and exposing for highlights captures ethereal scenes without blowing out natural skies.</p>
    `,
  },
  {
    title: 'The Digital Art Renaissance: Tools, Tablets, and Techniques for Concept Artists',
    excerpt: 'From digital painting in Photoshop & Procreate to 3D sculpting for games and cinema visual effects.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-12'),
    author: 'Concept Illustrator',
    category: 'Photography & Art',
    content: `
      <p class="lead">Digital tools empower artists to experiment with brush textures, layers, and color grading limitlessly.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Conceptual Visual Storytelling</h3>
      <p>Understanding silhouette, value grouping, and focal lighting brings imaginary worlds to life for film and games.</p>
    `,
  },

  // 18. DevOps
  {
    title: 'CI/CD Pipeline Construction: Automating Builds with GitHub Actions & Docker',
    excerpt: 'Streamline testing, containerization, and automated deployments with zero downtime.',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-04-20'),
    author: 'DevOps Engineer',
    category: 'DevOps',
    content: `
      <p class="lead">Automated integration and deployment pipelines ensure every code commit is tested and containerized safely.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Automated Testing & Containerization</h3>
      <p>Dockerizing applications guarantees environment consistency from local development staging to cloud production.</p>
    `,
  },
  {
    title: 'Kubernetes for Beginners: Orchestrating Containerized Microservices at Scale',
    excerpt: 'Learn pod management, ingress controllers, rolling updates, and self-healing deployments.',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-18'),
    author: 'Infrastructure Lead',
    category: 'DevOps',
    content: `
      <p class="lead">Kubernetes automates deployment, scaling, and operations of application containers across clusters.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Self-Healing Infrastructure</h3>
      <p>Automatic restarts, secret management, and dynamic load balancing guarantee continuous system availability.</p>
    `,
  },

  // 19. Creative Writing
  {
    title: 'Crafting Compelling Narratives: Character Arc Development in Fiction',
    excerpt: 'How to construct relatable character journeys, inner conflicts, and memorable dialogue.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-02-05'),
    author: 'Storyteller',
    category: 'Creative Writing',
    content: `
      <p class="lead">Great stories resonate because of human character transformation rather than plot twists alone.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">The Hero’s Inner Journey</h3>
      <p>Balancing external goals with internal flaws builds emotional stakes that keep readers engaged from page one.</p>
    `,
  },
  {
    title: 'Overcoming Writer\'s Block: Daily Prompts and Creative Exercises for Writers',
    excerpt: 'Practical routines to unlock inspiration, overcome perfectionism, and maintain daily writing velocity.',
    imageUrl: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-10'),
    author: 'Published Author',
    category: 'Creative Writing',
    content: `
      <p class="lead">Writer’s block is often perfectionism in disguise. Separating drafting from editing is key to creative flow.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Freewriting Routines</h3>
      <p>Setting a timer for 15 minutes of uninterrupted stream-of-consciousness writing bypasses inner critics.</p>
    `,
  },

  // 20. Blockchain
  {
    title: 'Demystifying Smart Contracts: Building Decentralized Apps on Ethereum',
    excerpt: 'Learn Solidity basics, gas optimization, ERC-20 tokens, and security audit fundamentals.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-03-28'),
    author: 'Web3 Engineer',
    category: 'Blockchain',
    content: `
      <p class="lead">Smart contracts execute code immutably on distributed ledgers without central intermediaries.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Decentralized Logic Execution</h3>
      <p>Building audited, gas-optimized contracts creates transparent, trustless financial and governance systems.</p>
    `,
  },
  {
    title: 'Web3 Ecosystem Overview: DeFi, DAOs, and Layer 2 Scaling Solutions',
    excerpt: 'Understanding optimistic rollups, zero-knowledge proofs, and the future of decentralized protocols.',
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-30'),
    author: 'Crypto Researcher',
    category: 'Blockchain',
    content: `
      <p class="lead">Layer 2 scaling technologies reduce transaction fees while maintaining Ethereum mainnet security.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Scale and Interoperability</h3>
      <p>ZK-rollups and cross-chain bridges unlock high-throughput applications for global decentralized finance.</p>
    `,
  },

  // 21. UI/UX Design
  {
    title: 'User-Centered Design Principles: Wireframing and Prototyping in Figma',
    excerpt: 'From user interviews and journey mapping to high-fidelity interactive wireframes.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-01-28'),
    author: 'Product Designer',
    category: 'UI/UX Design',
    content: `
      <p class="lead">Effective UX design starts by understanding human psychology and real user pain points.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Usability Testing & Iteration</h3>
      <p>Testing interactive prototypes early identifies navigation bottlenecks before engineering resources are spent.</p>
    `,
  },
  {
    title: 'Accessibility in UI Design: Building Inclusive Digital Experiences for All Users',
    excerpt: 'Designing for screen readers, keyboard navigation, color blindness, and WCAG compliance.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-04-16'),
    author: 'Accessibility Specialist',
    category: 'UI/UX Design',
    content: `
      <p class="lead">Web accessibility ensures people of all abilities can perceive, navigate, and interact with software.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">WCAG Guidelines</h3>
      <p>Providing semantic HTML landmarks, ARIA labels, and adequate contrast benefits every single user.</p>
    `,
  },

  // 22. Game Dev
  {
    title: 'Unreal Engine 5 vs Unity: Crafting Immersive Game Worlds in 2025',
    excerpt: 'Compare Nanite geometry, Lumen real-time lighting, C# vs C++ scripting, and asset store ecosystems.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-04'),
    author: 'Indie Game Dev',
    category: 'Game Dev',
    content: `
      <p class="lead">Game engines empower creators to render photo-realistic environments and interactive physics loops.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Next-Gen Real-Time Graphics</h3>
      <p>Unreal’s Lumen dynamic global illumination and Unity’s Universal Render Pipeline offer versatile choices for indie developers.</p>
    `,
  },
  {
    title: 'Game Physics and Mechanics: Designing Satisfying Gameplay Loops',
    excerpt: 'How tactile feedback, game feel, particle effects, and tight controls make games fun.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-14'),
    author: 'Game Designer',
    category: 'Game Dev',
    content: `
      <p class="lead">"Game Feel" refers to the subtle tactile feedback, audio cues, and responsiveness when interacting with controls.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">The Core Loop</h3>
      <p>A satisfying core loop—Action, Reward, Expansion—keeps players engaged and immersed for hours.</p>
    `,
  },

  // 23. Open Source
  {
    title: 'Your First Open Source Contribution: A Step-by-Step GitHub Guide',
    excerpt: 'How to find good first issues, fork repositories, submit clean pull requests, and communicate with maintainers.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-02-18'),
    author: 'OS Maintainer',
    category: 'Open Source',
    content: `
      <p class="lead">Contributing to open source accelerates your software growth while benefiting developers globally.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Navigating the Git Workflow</h3>
      <p>Forking, creating feature branches, writing tests, and responding constructively to code reviews builds confidence.</p>
    `,
  },
  {
    title: 'Sustaining Open Source Projects: Community Management and Project Governance',
    excerpt: 'How maintainers balance feature requests, bug triage, licensing, and sponsor support.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-08'),
    author: 'Community Lead',
    category: 'Open Source',
    content: `
      <p class="lead">Successful open source requires clear contributor guidelines, code of conduct, and sustainable funding models.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Fostering Community</h3>
      <p>Welcoming feedback and recognizing contributor efforts creates a thriving, long-lasting project ecosystem.</p>
    `,
  },

  // 24. Gadgets
  {
    title: 'The Next-Gen Smart Home Setup: Matter Protocol and Smart Ecosystem Integration',
    excerpt: 'How unified smart home standards are eliminating platform fragmentation for seamless home automation.',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-04-28'),
    author: 'Tech Reviewer',
    category: 'Gadgets',
    content: `
      <p class="lead">The Matter protocol enables smart home devices from Apple, Google, Amazon, and Zigbee to work together locally.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Interoperable Automation</h3>
      <p>Local control ensures sub-second automation responses without reliance on cloud connectivity or proprietary hubs.</p>
    `,
  },
  {
    title: 'Flagship Smartphone Camera Battle: Sensors, Zoom Lenses, and Computational Processing',
    excerpt: 'A deep dive into mobile camera hardware, periscope zoom, night mode processing, and RAW capture.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-20'),
    author: 'Mobile Reviewer',
    category: 'Gadgets',
    content: `
      <p class="lead">Modern smartphone photography relies heavily on computational algorithms merging multiple frames instantly.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Computational Photography</h3>
      <p>Large 1-inch sensors paired with neural processing engines deliver stunning dynamic range in miniature form factors.</p>
    `,
  },

  // 25. Career & Tech
  {
    title: 'Ace the Technical Interview: System Design and Coding Problem Strategies',
    excerpt: 'How to approach coding challenges, communicate thought processes, and design distributed systems.',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-03-15'),
    author: 'Engineering Mentor',
    category: 'Career & Tech',
    content: `
      <p class="lead">Technical interviews evaluate problem-solving clarity, edge case handling, and architectural trade-offs.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">System Design Frameworks</h3>
      <p>Deconstructing scalable systems into load balancers, database shards, caches, and queues demonstrates senior-level thinking.</p>
    `,
  },
  {
    title: 'Navigating Tech Careers: From Junior Developer to Engineering Manager',
    excerpt: 'Key milestones, leadership skills, mentorship, and career growth strategies in software engineering.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-22'),
    author: 'Engineering VP',
    category: 'Career & Tech',
    content: `
      <p class="lead">Career progression in tech moves from mastering individual execution to magnifying team impact and architecture.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Soft Skills & Leadership</h3>
      <p>Empathy, strategic alignment, clear technical writing, and mentoring peers are the hallmarks of engineering leaders.</p>
    `,
  },

  // 26. Education
  {
    title: 'A Journey Through VESIT: More Than Just an Engineering College',
    excerpt: 'An immersive experience at Vivekanand Education Society\'s Institute of Technology, exploring academics and campus life.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxm12O2yAp1cMyhZhm6VwsPHBChcH6IGDHuvfD6vepOb0sT4-A44dsS8Pz&s=10',
    createdAt: new Date('2024-01-15'),
    author: 'A Proud VESITian',
    category: 'Education',
    content: `
      <p class="lead">Nestled in Chembur, Mumbai, VESIT is a vibrant ecosystem of innovation, friendship, and rigorous learning.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Campus & Community</h3>
      <p>From lively canteen debates to student chapters like IEEE and CSI, VESIT builds critical engineering and life skills.</p>
    `,
  },
  {
    title: 'The Future of EdTech: Personalized Learning and Interactive Digital Classrooms',
    excerpt: 'How AI tutors, gamified learning, and virtual labs are democratizing quality education globally.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-25'),
    author: 'EdTech Educator',
    category: 'Education',
    content: `
      <p class="lead">Technology allows tailoring educational pace and style to individual student needs globally.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Interactive Learning Environments</h3>
      <p>Self-paced video modules, automated coding feedback, and peer forums make learning engaging and accessible.</p>
    `,
  },

  // 27. Others
  {
    title: 'The Farm-to-Table Movement: Why Local Sourcing Matters',
    excerpt: 'Exploring the benefits of sustainable eating, supporting local farmers, and celebrating fresh seasonal food.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-08-14'),
    author: 'Culinary Critic',
    category: 'Others',
    content: `
      <p class="lead">Farm-to-table connects consumers directly with local agriculture, delivering unmatched freshness and sustainability.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">Community Impact</h3>
      <p>Supporting local farms preserves arable land, reduces carbon transport footprints, and celebrates natural flavors.</p>
    `,
  },
  {
    title: 'Exploring Coffee Culture: From Espresso Beans to Pour-Over Craft',
    excerpt: 'A beginner\'s guide to coffee origin regions, roast profiles, grinding techniques, and brewing methods.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-08'),
    author: 'Coffee Enthusiast',
    category: 'Others',
    content: `
      <p class="lead">Crafting extraordinary coffee combines bean origin selection, precise grind sizes, and water temperature control.</p>
      <h3 class="font-bold text-2xl mt-8 mb-4">The Specialty Coffee Craft</h3>
      <p>From French Press to Chemex pour-overs, discovering flavor profiles is a sensory journey worth savoring.</p>
    `,
  }
];

async function seed() {
  try {
    if (!mongoURI) {
      throw new Error('MONGODB_URI is required. Set it in backend/.env.');
    }

    await mongoose.connect(mongoURI, {
      dbName: 'blogcms',
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB for seeding.');

    const blogsWithStats = sampleBlogs.map(blog => ({
      ...blog,
      views: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
      likes: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
    }));

    const result = await Blog.bulkWrite(blogsWithStats.map(blog => ({
      updateOne: {
        filter: { title: blog.title },
        update: { $setOnInsert: blog },
        upsert: true,
      },
    })), { ordered: false });

    console.log(`Added ${result.upsertedCount} new blogs; ${result.matchedCount} existing titles were left unchanged.`);
  } catch (error) {
    console.error('Blog seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
