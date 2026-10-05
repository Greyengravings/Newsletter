import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend API URL
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const defaultBlogs = [
  // 1. Technology
  {
    _id: 'tech-1',
    title: 'The Future of AI: How Generative Models are Changing the World',
    excerpt: 'Explore the rapid evolution of Artificial Intelligence and its profound impact on creativity, industry, and daily life.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-12',
    author: 'Tech Futurist',
    category: 'Technology',
    views: 1850,
    likes: 920,
    content: '<p class="lead">Artificial Intelligence is driving the next industrial revolution...</p>'
  },
  {
    _id: 'tech-2',
    title: 'My Smart India Hackathon Experience: Innovation Under Pressure',
    excerpt: 'A thrilling account of participating in the Smart India Hackathon, from ideation to implementation.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-02-10',
    author: 'Hackathon Enthusiast',
    category: 'Technology',
    views: 1420,
    likes: 680,
    content: '<p class="lead">Building rapid prototypes in 36 continuous hours teaches invaluable engineering skills...</p>'
  },

  // 2. AI & ML
  {
    _id: 'aiml-1',
    title: 'Mastering Machine Learning Algorithms: From Regression to Neural Networks',
    excerpt: 'A foundational roadmap to understanding predictive modeling, supervised learning, and deep neural nets.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-01',
    author: 'Data Scientist Pro',
    category: 'AI & ML',
    views: 2100,
    likes: 1150,
    content: '<p class="lead">Machine Learning algorithms power modern recommendation engines and computer vision...</p>'
  },
  {
    _id: 'aiml-2',
    title: 'Generative AI in 2025: Beyond LLMs to Multimodal Autonomous Agents',
    excerpt: 'Discover how modern AI agents execute complex multi-step workflows with vision, voice, and tool use.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-15',
    author: 'AI Researcher',
    category: 'AI & ML',
    views: 1980,
    likes: 890,
    content: '<p class="lead">AI is transitioning from text prompts to autonomous agents capable of API execution...</p>'
  },

  // 3. Business & Finance
  {
    _id: 'biz-1',
    title: 'Navigating Personal Finance: Smart Investment Strategies for Young Professionals',
    excerpt: 'Essential advice on budgeting, index funds, compound growth, and building long-term financial security.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-04-18',
    author: 'Finance Strategist',
    category: 'Business & Finance',
    views: 1550,
    likes: 740,
    content: '<p class="lead">Building wealth early starts with discipline, emergency funds, and consistent investing...</p>'
  },
  {
    _id: 'biz-2',
    title: 'The Rise of Fintech Innovation: How Digital Banking is Reshaping Commerce',
    excerpt: 'An overview of UPI payments, decentralized finance, micro-loans, and the future of global banking.',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-08-02',
    author: 'Market Analyst',
    category: 'Business & Finance',
    views: 1320,
    likes: 610,
    content: '<p class="lead">Financial technology has democratized payments, enabling instant cross-border transactions...</p>'
  },

  // 4. Coding
  {
    _id: 'code-1',
    title: 'Clean Code Principles: Writing Maintainable and Scalable JavaScript',
    excerpt: 'Best practices for writing readable, self-documenting, and bug-resistant JavaScript and TypeScript code.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-03-22',
    author: 'Senior Software Eng',
    category: 'Coding',
    views: 1620,
    likes: 830,
    content: '<p class="lead">Writing code that works is easy; writing code your team can maintain requires mastery...</p>'
  },
  {
    _id: 'code-2',
    title: 'Data Structures and Algorithms Demystified: Trees, Graphs, and Dynamic Programming',
    excerpt: 'Master fundamental computer science concepts to solve complex engineering problems and ace technical interviews.',
    imageUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-30',
    author: 'Algo Master',
    category: 'Coding',
    views: 1780,
    likes: 910,
    content: '<p class="lead">Data structures provide the building blocks for efficient software and algorithms...</p>'
  },

  // 5. Productivity
  {
    _id: 'prod-1',
    title: 'The Pomodoro & Time-Blocking Framework: Doubling Your Daily Output',
    excerpt: 'Transform your daily workflow using structured focus sessions, deep work blocks, and distraction elimination.',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-01-20',
    author: 'Productivity Hacker',
    category: 'Productivity',
    views: 1450,
    likes: 720,
    content: '<p class="lead">Focus is a finite resource. Structuring your workday into deep work blocks boosts output...</p>'
  },
  {
    _id: 'prod-2',
    title: 'Building a Second Brain: Digital Knowledge Management with Notion and Obsidian',
    excerpt: 'Learn how to capture, organize, and synthesize ideas to supercharge your learning and creative output.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-18',
    author: 'Knowledge Architect',
    category: 'Productivity',
    views: 1690,
    likes: 850,
    content: '<p class="lead">Your brain is for having ideas, not storing them. A digital second brain acts as a permanent hub...</p>'
  },

  // 6. Web Dev
  {
    _id: 'webdev-1',
    title: 'A Deep Dive into React 19: Actions, Server Components, and Optimistic UI',
    excerpt: 'Explore the game-changing features of React 19 including useActionState, useOptimistic, and compiler optimizations.',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-10',
    author: 'Frontend Architect',
    category: 'Web Dev',
    views: 1480,
    likes: 790,
    content: '<p class="lead">React 19 brings simplified state management, server actions, and automated memoization...</p>'
  },
  {
    _id: 'webdev-2',
    title: 'Modern CSS Architecture: Tailwind CSS v4, CSS Grid, and Container Queries',
    excerpt: 'Unlock responsive layout techniques with Tailwind v4, subgrid support, and modern CSS features.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-28',
    author: 'CSS Wizard',
    category: 'Web Dev',
    views: 1390,
    likes: 670,
    content: '<p class="lead">CSS has evolved dramatically. Container queries allow components to respond dynamically...</p>'
  },

  // 7. Design
  {
    _id: 'design-1',
    title: 'The Psychology of Color in Visual Design and Branding',
    excerpt: 'How color choices influence user perception, emotional response, and brand trust across web and mobile platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-02-14',
    author: 'Brand Designer',
    category: 'Design',
    views: 1300,
    likes: 640,
    content: '<p class="lead">Color is one of the most powerful communication tools in design, conveying emotion instantly...</p>'
  },
  {
    _id: 'design-2',
    title: 'Design Systems in Action: Bridging the Gap Between Designers and Developers',
    excerpt: 'How reusable tokenized component libraries unify design language and accelerate product development.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-19',
    author: 'UX Lead',
    category: 'Design',
    views: 1250,
    likes: 590,
    content: '<p class="lead">A design system is a single source of truth containing tokens, components, and brand guidelines...</p>'
  },

  // 8. Digital Marketing
  {
    _id: 'mkt-1',
    title: 'SEO Strategies for 2025: Ranking High in the AI Search Overview Era',
    excerpt: 'Adapt your content strategy to generative search engines, E-E-A-T principles, and authoritative topic clusters.',
    imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-04-05',
    author: 'Growth Specialist',
    category: 'Digital Marketing',
    views: 1350,
    likes: 710,
    content: '<p class="lead">Search engine optimization is shifting toward deep topical authority and user intent fulfillment...</p>'
  },
  {
    _id: 'mkt-2',
    title: 'Content Marketing Mastery: Building an Engaged Organic Audience from Scratch',
    excerpt: 'Learn how to create high-value blogs, newsletters, and social content that convert casual readers into brand loyalists.',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-02',
    author: 'Content Strategist',
    category: 'Digital Marketing',
    views: 1210,
    likes: 580,
    content: '<p class="lead">Great content marketing provides actionable value long before asking for a subscription...</p>'
  },

  // 9. Full Stack
  {
    _id: 'fs-1',
    title: 'Getting Started with Full Stack Development: A Beginner\'s Roadmap',
    excerpt: 'A comprehensive roadmap for aspiring full stack developers, covering frontend, backend, databases, and APIs.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-03-05',
    author: 'Dev Learner',
    category: 'Full Stack',
    views: 1250,
    likes: 620,
    content: '<p class="lead">Full stack development offers the opportunity to build complete end-to-end web applications...</p>'
  },
  {
    _id: 'fs-2',
    title: 'Building Scalable RESTful & GraphQL APIs with Node.js and Express',
    excerpt: 'Learn route design, authentication middleware, error handling, and database indexing for production APIs.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-25',
    author: 'Backend Lead',
    category: 'Full Stack',
    views: 1410,
    likes: 730,
    content: '<p class="lead">APIs serve as the connective tissue between frontend interfaces and database backends...</p>'
  },

  // 10. Travel & Adventure
  {
    _id: 'trv-1',
    title: 'Exploring Scandinavia: A Guide to the Fjords and Northern Lights',
    excerpt: 'Discover the breathtaking natural beauty and minimalist charm of Norway, Sweden, and Denmark.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-20',
    author: 'Global Nomad',
    category: 'Travel & Adventure',
    views: 1280,
    likes: 690,
    content: '<p class="lead">There is a specific silence found in the Scandinavian wilderness under the Aurora Borealis...</p>'
  },
  {
    _id: 'trv-2',
    title: 'Backpacking Across Southeast Asia: Hidden Gems and Budget Travel Tips',
    excerpt: 'Navigating Vietnam, Thailand, and Indonesia on a budget with rich culture and stunning landscapes.',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-08-10',
    author: 'Wanderlust Explorer',
    category: 'Travel & Adventure',
    views: 1340,
    likes: 750,
    content: '<p class="lead">Southeast Asia offers an unmatched blend of rich history, night markets, and pristine beaches...</p>'
  },

  // 11. Data Science
  {
    _id: 'ds-1',
    title: 'Data Visualization with Python: Transforming Raw Metrics into Insights',
    excerpt: 'Master Pandas, Matplotlib, Seaborn, and Plotly to build interactive dashboards and data stories.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzt27MjSQ8WKuYZOw5lzGbROGfSNuB-sYXprB1ztzNfuanuPJ9jlWELc&s=10',
    createdAt: '2024-05-08',
    author: 'Data Analyst',
    category: 'Data Science',
    views: 1150,
    likes: 540,
    content: '<p class="lead">Data visualization bridges complex statistical computation and actionable business decisions...</p>'
  },
  {
    _id: 'ds-2',
    title: 'Big Data Analytics: Harnessing Spark, SQL, and Predictive Modeling at Scale',
    excerpt: 'How processing millions of data points enables personalized recommendations and trend forecasts.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-22',
    author: 'Data Engineer',
    category: 'Data Science',
    views: 1290,
    likes: 660,
    content: '<p class="lead">Big data pipelines ingest distributed streams to provide real-time operational metrics...</p>'
  },

  // 12. Health & Fitness
  {
    _id: 'fit-1',
    title: 'The Science of Strength Training: Maximizing Muscle Growth and Mobility Safely',
    excerpt: 'An evidence-based guide to progressive overload, proper form, recovery protocols, and joint longevity.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-03-12',
    author: 'Fitness Coach',
    category: 'Health & Fitness',
    views: 1180,
    likes: 590,
    content: '<p class="lead">Strength training enhances metabolic health, bone density, and functional athletic movement...</p>'
  },
  {
    _id: 'fit-2',
    title: 'Nutrition Essentials: Balancing Macronutrients, Hydration, and Metabolic Health',
    excerpt: 'Demystifying proteins, complex carbs, healthy fats, and micronutrients for peak physical energy.',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-14',
    author: 'Nutritionist',
    category: 'Health & Fitness',
    views: 1240,
    likes: 630,
    content: '<p class="lead">Fueling your body with whole foods sustains energy levels and speeds up athletic recovery...</p>'
  },

  // 13. Cybersecurity
  {
    _id: 'sec-1',
    title: 'Zero Trust Architecture: Protecting Modern Distributed Cloud Infrastructure',
    excerpt: 'Why "never trust, always verify" is the essential security paradigm for modern web apps and enterprises.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-02-28',
    author: 'Security Specialist',
    category: 'Cybersecurity',
    views: 1080,
    likes: 510,
    content: '<p class="lead">Traditional perimeter security is obsolete in an era of remote work and multi-cloud deployments...</p>'
  },
  {
    _id: 'sec-2',
    title: 'Ethical Hacking 101: Understanding Penetration Testing and Vulnerability Assessment',
    excerpt: 'Learn how security researchers find OWASP Top 10 vulnerabilities like SQL injection and XSS.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-16',
    author: 'Ethical Hacker',
    category: 'Cybersecurity',
    views: 1360,
    likes: 720,
    content: '<p class="lead">Ethical hackers simulate attacks to discover security flaws and patch systems before exploitation...</p>'
  },

  // 14. Lifestyle & Wellness
  {
    _id: 'life-1',
    title: 'The Art of Mindful Living in a Hyper-Connected World',
    excerpt: 'Practical strategies to reclaim your focus, reduce stress, and find balance in the age of digital distractions.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-05',
    author: 'Serenity Seeker',
    category: 'Lifestyle & Wellness',
    views: 1100,
    likes: 530,
    content: '<p class="lead">Continuous partial attention degrades peace of mind. Mindfulness reclaims presence and focus...</p>'
  },
  {
    _id: 'life-2',
    title: 'Creating a Minimalist Living Space for Mental Clarity and Inner Peace',
    excerpt: 'How decluttering your physical environment leads to reduced stress, heightened focus, and intentional living.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-08-01',
    author: 'Minimalist Guide',
    category: 'Lifestyle & Wellness',
    views: 1170,
    likes: 600,
    content: '<p class="lead">Your surroundings reflect your state of mind. Simplifying your space fosters daily calm and clarity...</p>'
  },

  // 15. Cloud
  {
    _id: 'cld-1',
    title: 'AWS vs Azure vs GCP: Choosing the Right Cloud Infrastructure Provider',
    excerpt: 'A detailed comparative breakdown of compute instances, serverless, managed Kubernetes, and pricing models.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-04-12',
    author: 'Cloud Architect',
    category: 'Cloud',
    views: 950,
    likes: 480,
    content: '<p class="lead">Selecting a cloud provider depends on workload requirements, ecosystem integration, and cost...</p>'
  },
  {
    _id: 'cld-2',
    title: 'Serverless Architecture: Building Elastic Web Backends with Cloud Functions',
    excerpt: 'How serverless computing eliminates server management, offering automatic scaling and pay-per-execution pricing.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-10',
    author: 'Serverless Pro',
    category: 'Cloud',
    views: 1220,
    likes: 640,
    content: '<p class="lead">Serverless lets developers deploy functions that scale instantly from zero to thousands of requests...</p>'
  },

  // 16. Mobile Dev
  {
    _id: 'mob-1',
    title: 'Flutter vs React Native in 2025: Selecting the Ultimate Cross-Platform Framework',
    excerpt: 'Compare performance, developer experience, UI rendering, and community ecosystems for mobile development.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-22',
    author: 'Mobile Dev Lead',
    category: 'Mobile Dev',
    views: 1020,
    likes: 510,
    content: '<p class="lead">Cross-platform mobile frameworks allow shipping high-performance iOS and Android apps from one codebase...</p>'
  },
  {
    _id: 'mob-2',
    title: 'iOS App Development with Swift & SwiftUI: Modern Principles for Native Apps',
    excerpt: 'Master declarative UI development, async/await concurrency, and Apple design guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-08-05',
    author: 'Swift Developer',
    category: 'Mobile Dev',
    views: 1130,
    likes: 580,
    content: '<p class="lead">SwiftUI simplifies iOS user interfaces with reactive state binding and native Apple hardware speed...</p>'
  },

  // 17. Photography & Art
  {
    _id: 'art-1',
    title: 'Mastering Golden Hour Photography: Composition, Lighting, and Color Calibration',
    excerpt: 'Capture dramatic landscapes and warm portraiture during sunrise and sunset lighting windows.',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-03-18',
    author: 'Visual Artist',
    category: 'Photography & Art',
    views: 960,
    likes: 470,
    content: '<p class="lead">Golden hour provides soft, directional, warm light that enhances depth and atmosphere...</p>'
  },
  {
    _id: 'art-2',
    title: 'The Digital Art Renaissance: Tools, Tablets, and Techniques for Concept Artists',
    excerpt: 'From digital painting in Photoshop & Procreate to 3D sculpting for games and cinema visual effects.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-12',
    author: 'Concept Illustrator',
    category: 'Photography & Art',
    views: 1090,
    likes: 550,
    content: '<p class="lead">Digital tools empower artists to experiment with brush textures, layers, and color grading limitlessly...</p>'
  },

  // 18. DevOps
  {
    _id: 'devops-1',
    title: 'CI/CD Pipeline Construction: Automating Builds with GitHub Actions & Docker',
    excerpt: 'Streamline testing, containerization, and automated deployments with zero downtime.',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-04-20',
    author: 'DevOps Engineer',
    category: 'DevOps',
    views: 910,
    likes: 460,
    content: '<p class="lead">Automated integration and deployment pipelines ensure every code commit is tested safely...</p>'
  },
  {
    _id: 'devops-2',
    title: 'Kubernetes for Beginners: Orchestrating Containerized Microservices at Scale',
    excerpt: 'Learn pod management, ingress controllers, rolling updates, and self-healing deployments.',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-18',
    author: 'Infrastructure Lead',
    category: 'DevOps',
    views: 1160,
    likes: 590,
    content: '<p class="lead">Kubernetes automates deployment, scaling, and operations of application containers across clusters...</p>'
  },

  // 19. Creative Writing
  {
    _id: 'write-1',
    title: 'Crafting Compelling Narratives: Character Arc Development in Fiction',
    excerpt: 'How to construct relatable character journeys, inner conflicts, and memorable dialogue.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-02-05',
    author: 'Storyteller',
    category: 'Creative Writing',
    views: 920,
    likes: 480,
    content: '<p class="lead">Great stories resonate because of human character transformation rather than plot twists alone...</p>'
  },
  {
    _id: 'write-2',
    title: 'Overcoming Writer\'s Block: Daily Prompts and Creative Exercises for Writers',
    excerpt: 'Practical routines to unlock inspiration, overcome perfectionism, and maintain daily writing velocity.',
    imageUrl: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-10',
    author: 'Published Author',
    category: 'Creative Writing',
    views: 1040,
    likes: 520,
    content: '<p class="lead">Writer’s block is often perfectionism in disguise. Separating drafting from editing is key...</p>'
  },

  // 20. Blockchain
  {
    _id: 'chain-1',
    title: 'Demystifying Smart Contracts: Building Decentralized Apps on Ethereum',
    excerpt: 'Learn Solidity basics, gas optimization, ERC-20 tokens, and security audit fundamentals.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-03-28',
    author: 'Web3 Engineer',
    category: 'Blockchain',
    views: 870,
    likes: 440,
    content: '<p class="lead">Smart contracts execute code immutably on distributed ledgers without central intermediaries...</p>'
  },
  {
    _id: 'chain-2',
    title: 'Web3 Ecosystem Overview: DeFi, DAOs, and Layer 2 Scaling Solutions',
    excerpt: 'Understanding optimistic rollups, zero-knowledge proofs, and the future of decentralized protocols.',
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-30',
    author: 'Crypto Researcher',
    category: 'Blockchain',
    views: 1210,
    likes: 630,
    content: '<p class="lead">Layer 2 scaling technologies reduce transaction fees while maintaining Ethereum mainnet security...</p>'
  },

  // 21. UI/UX Design
  {
    _id: 'uiux-1',
    title: 'User-Centered Design Principles: Wireframing and Prototyping in Figma',
    excerpt: 'From user interviews and journey mapping to high-fidelity interactive wireframes.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-01-28',
    author: 'Product Designer',
    category: 'UI/UX Design',
    views: 1200,
    likes: 620,
    content: '<p class="lead">Effective UX design starts by understanding human psychology and real user pain points...</p>'
  },
  {
    _id: 'uiux-2',
    title: 'Accessibility in UI Design: Building Inclusive Digital Experiences for All Users',
    excerpt: 'Designing for screen readers, keyboard navigation, color blindness, and WCAG compliance.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-04-16',
    author: 'Accessibility Specialist',
    category: 'UI/UX Design',
    views: 1050,
    likes: 510,
    content: '<p class="lead">Web accessibility ensures people of all abilities can perceive, navigate, and interact with software...</p>'
  },

  // 22. Game Dev
  {
    _id: 'game-1',
    title: 'Unreal Engine 5 vs Unity: Crafting Immersive Game Worlds in 2025',
    excerpt: 'Compare Nanite geometry, Lumen real-time lighting, C# vs C++ scripting, and asset store ecosystems.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-04',
    author: 'Indie Game Dev',
    category: 'Game Dev',
    views: 780,
    likes: 390,
    content: '<p class="lead">Game engines empower creators to render photo-realistic environments and interactive physics loops...</p>'
  },
  {
    _id: 'game-2',
    title: 'Game Physics and Mechanics: Designing Satisfying Gameplay Loops',
    excerpt: 'How tactile feedback, game feel, particle effects, and tight controls make games fun.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-14',
    author: 'Game Designer',
    category: 'Game Dev',
    views: 1120,
    likes: 570,
    content: '<p class="lead">"Game Feel" refers to the subtle tactile feedback, audio cues, and responsiveness when interacting with controls...</p>'
  },

  // 23. Open Source
  {
    _id: 'os-1',
    title: 'Your First Open Source Contribution: A Step-by-Step GitHub Guide',
    excerpt: 'How to find good first issues, fork repositories, submit clean pull requests, and communicate with maintainers.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-02-18',
    author: 'OS Maintainer',
    category: 'Open Source',
    views: 980,
    likes: 490,
    content: '<p class="lead">Contributing to open source accelerates your software growth while benefiting developers globally...</p>'
  },
  {
    _id: 'os-2',
    title: 'Sustaining Open Source Projects: Community Management and Governance',
    excerpt: 'How maintainers balance feature requests, bug triage, licensing, and sponsor support.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-08',
    author: 'Community Lead',
    category: 'Open Source',
    views: 1010,
    likes: 520,
    content: '<p class="lead">Successful open source requires clear contributor guidelines, code of conduct, and sustainable funding...</p>'
  },

  // 24. Gadgets
  {
    _id: 'gadget-1',
    title: 'The Next-Gen Smart Home Setup: Matter Protocol and Smart Ecosystem Integration',
    excerpt: 'How unified smart home standards are eliminating platform fragmentation for seamless home automation.',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-04-28',
    author: 'Tech Reviewer',
    category: 'Gadgets',
    views: 820,
    likes: 410,
    content: '<p class="lead">The Matter protocol enables smart home devices from Apple, Google, Amazon, and Zigbee to work together...</p>'
  },
  {
    _id: 'gadget-2',
    title: 'Flagship Smartphone Camera Battle: Sensors, Zoom Lenses, and Processing',
    excerpt: 'A deep dive into mobile camera hardware, periscope zoom, night mode processing, and RAW capture.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-20',
    author: 'Mobile Reviewer',
    category: 'Gadgets',
    views: 1270,
    likes: 680,
    content: '<p class="lead">Modern smartphone photography relies heavily on computational algorithms merging multiple frames instantly...</p>'
  },

  // 25. Career & Tech
  {
    _id: 'car-1',
    title: 'Ace the Technical Interview: System Design and Coding Problem Strategies',
    excerpt: 'How to approach coding challenges, communicate thought processes, and design distributed systems.',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-03-15',
    author: 'Engineering Mentor',
    category: 'Career & Tech',
    views: 890,
    likes: 450,
    content: '<p class="lead">Technical interviews evaluate problem-solving clarity, edge case handling, and architectural trade-offs...</p>'
  },
  {
    _id: 'car-2',
    title: 'Navigating Tech Careers: From Junior Developer to Engineering Manager',
    excerpt: 'Key milestones, leadership skills, mentorship, and career growth strategies in software engineering.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-06-22',
    author: 'Engineering VP',
    category: 'Career & Tech',
    views: 1140,
    likes: 580,
    content: '<p class="lead">Career progression in tech moves from mastering individual execution to magnifying team impact...</p>'
  },

  // 26. Education
  {
    _id: 'edu-1',
    title: 'A Journey Through VESIT: More Than Just an Engineering College',
    excerpt: 'An immersive experience at Vivekanand Education Society\'s Institute of Technology, exploring academics and campus life.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxm12O2yAp1cMyhZhm6VwsPHBChcH6IGDHuvfD6vepOb0sT4-A44dsS8Pz&s=10',
    createdAt: '2024-01-15',
    author: 'A Proud VESITian',
    category: 'Education',
    views: 1800,
    likes: 950,
    content: '<p class="lead">Nestled in Chembur, Mumbai, VESIT is a vibrant ecosystem of innovation, friendship, and learning...</p>'
  },
  {
    _id: 'edu-2',
    title: 'The Future of EdTech: Personalized Learning and Interactive Digital Classrooms',
    excerpt: 'How AI tutors, gamified learning, and virtual labs are democratizing quality education globally.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-25',
    author: 'EdTech Educator',
    category: 'Education',
    views: 1110,
    likes: 560,
    content: '<p class="lead">Technology allows tailoring educational pace and style to individual student needs globally...</p>'
  },

  // 27. Others
  {
    _id: 'oth-1',
    title: 'The Farm-to-Table Movement: Why Local Sourcing Matters',
    excerpt: 'Exploring the benefits of sustainable eating, supporting local farmers, and celebrating fresh seasonal food.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-08-14',
    author: 'Culinary Critic',
    category: 'Others',
    views: 600,
    likes: 310,
    content: '<p class="lead">Farm-to-table connects consumers directly with local agriculture, delivering unmatched freshness...</p>'
  },
  {
    _id: 'oth-2',
    title: 'Exploring Coffee Culture: From Espresso Beans to Pour-Over Craft',
    excerpt: 'A beginner\'s guide to coffee origin regions, roast profiles, grinding techniques, and brewing methods.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-07-08',
    author: 'Coffee Enthusiast',
    category: 'Others',
    views: 940,
    likes: 470,
    content: '<p class="lead">Crafting extraordinary coffee combines bean origin selection, precise grind sizes, and water temperature...</p>'
  }
];

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
});

export const bookmarkPost = createAsyncThunk('posts/bookmarkPost', async ({ postId, userId }) => {
  const response = await axios.post(`${API_URL}/blogs/${postId}/bookmark`, { userId });
  return response.data;
});

export const unbookmarkPost = createAsyncThunk('posts/unbookmarkPost', async ({ postId, userId }) => {
  const response = await axios.delete(`${API_URL}/blogs/${postId}/bookmark`, { data: { userId } });
  return response.data;
});

export const fetchBookmarkedPosts = createAsyncThunk('posts/fetchBookmarkedPosts', async (userId) => {
  const response = await axios.get(`${API_URL}/blogs/user/${userId}/bookmarks`);
  return response.data;
});

export const incrementViewCount = createAsyncThunk('posts/incrementViewCount', async (postId) => {
  const response = await axios.post(`${API_URL}/blogs/${postId}/view`);
  return response.data;
});

const initialState = {
  posts: defaultBlogs,
  currentPost: null,
  bookmarkedPosts: [],
  status: 'idle',
  postStatus: 'idle',
  error: null,
  postError: null,
  filter: 'all',
  selectedCategory: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    updatePost(state, action) {
      const idx = state.posts.findIndex(p => p._id === action.payload._id);
      if (idx !== -1) state.posts[idx] = action.payload;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(p => p._id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload.filter;
      state.selectedCategory = action.payload.category || '';
    },
    clearFilter(state) {
      state.filter = 'all';
      state.selectedCategory = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.posts = action.payload;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'succeeded'; // keep default blogs so site continues working
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.postStatus = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postStatus = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.postStatus = 'failed';
        state.postError = action.error.message;
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p._id === action.meta.arg.postId);
        if (post) {
          post.bookmarkedBy = post.bookmarkedBy || [];
          post.bookmarkedBy.push(action.meta.arg.userId);
        }
      })
      .addCase(unbookmarkPost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p._id === action.meta.arg.postId);
        if (post) {
          post.bookmarkedBy = post.bookmarkedBy.filter(id => id !== action.meta.arg.userId);
        }
      })
      .addCase(fetchBookmarkedPosts.fulfilled, (state, action) => {
        state.bookmarkedPosts = action.payload;
      })
      .addCase(incrementViewCount.fulfilled, (state, action) => {
        const post = state.posts.find(p => p._id === action.meta.arg);
        if (post) {
          post.views = action.payload.views;
        }
      });
  }
});

export const { addPost, updatePost, deletePost, setFilter, clearFilter } = postsSlice.actions;

export default postsSlice.reducer;
