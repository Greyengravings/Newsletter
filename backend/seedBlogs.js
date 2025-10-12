const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://nihalanihitesh13_db_user:LhN8E2chhBAab7Us@cluster0.swyrh.mongodb.net/blogcms?retryWrites=true&w=majority';

const sampleBlogs = [
  {
    title: 'A Journey Through VESIT: More Than Just an Engineering College',
    excerpt: 'An immersive experience at Vivekanand Education Society\'s Institute of Technology, exploring academics, culture, and personal growth.',
    imageUrl: '/images.jpeg',
    createdAt: new Date('2024-01-15'),
    author: 'A Proud VESITian',
    category: 'Education',
    content: `
      <p class="lead">Nestled in the heart of Chembur, Mumbai, the Vivekanand Education Society's Institute of Technology—or VESIT, as we affectionately call it—is more than just a place to earn a degree. It's a vibrant ecosystem of innovation, friendship, and learning that shapes you for the world beyond the classroom.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Campus and Community</h3>
      <p>The moment you walk through the gates, you feel a palpable energy. The campus is a hub of constant activity, from students rushing to classes to lively discussions at the canteen. What truly defines VESIT is its community. The seniors are incredibly supportive, always ready to guide you through tough subjects or give you tips for navigating college life. The various student chapters and committees, like IEEE and CSI, provide fantastic platforms to learn new skills and network with peers.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Academics and Beyond</h3>
      <p>While the curriculum is rigorous and challenging, the faculty encourages us to think critically and apply theoretical knowledge to real-world problems. The labs are well-equipped, giving us hands-on experience with the latest technologies. But learning at VESIT isn't confined to textbooks. We are constantly encouraged to participate in hackathons, coding competitions, and national-level tech fests, which helps us build a strong practical foundation for our careers.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">My Personal Takeaway</h3>
      <p>For me, VESIT has been a transformative experience. It has taught me the importance of perseverance, teamwork, and continuous learning. It's a place that pushes your limits and prepares you not just to be a competent engineer, but a well-rounded individual. If you're an aspiring engineer looking for an institution that offers a perfect blend of academic excellence and a thriving student life, VESIT is a name you can trust.</p>
    `,
  },
  {
    title: 'My Smart India Hackathon Experience: Innovation Under Pressure',
    excerpt: 'A thrilling account of participating in the Smart India Hackathon, from ideation to implementation.',
    imageUrl: '/images1.jpeg',
    createdAt: new Date('2024-02-10'),
    author: 'Hackathon Enthusiast',
    category: 'Technology',
    content: `
      <p class="lead">The Smart India Hackathon (SIH) is not just a competition; it's a crucible where ideas are forged into solutions under the intense heat of time constraints and high expectations.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Preparation Phase</h3>
      <p>Months before the event, our team began brainstorming. We researched problem statements from various government ministries, looking for challenges that aligned with our skills and passions. The key was to choose a problem that was both impactful and feasible within the 36-hour timeframe.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Hackathon Weekend</h3>
      <p>The atmosphere at the venue was electric. Hundreds of teams, mentors from top companies, and judges from government departments created an environment charged with innovation. Our team worked tirelessly, dividing tasks based on strengths—some focused on backend development, others on UI/UX, and I handled the integration and testing.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Challenges and Breakthroughs</h3>
      <p>We faced numerous challenges: API integrations that failed, unexpected bugs, and the constant pressure of the ticking clock. But each obstacle became a learning opportunity. One breakthrough moment was when our solution for a smart waste management system finally worked, demonstrating real-time tracking and optimization.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Aftermath and Lessons</h3>
      <p>While we didn't win first place, the experience was invaluable. We learned the importance of rapid prototyping, effective communication, and resilience. More importantly, we built something that could potentially make a real difference. SIH taught me that innovation thrives under pressure, and with the right team and mindset, you can achieve extraordinary things.</p>
    `,
  },
  {
    title: 'Getting Started with Full Stack Development: A Beginner\'s Guide',
    excerpt: 'A comprehensive roadmap for aspiring full stack developers, covering essential technologies and best practices.',
    imageUrl: '/vite.svg',
    createdAt: new Date('2024-03-05'),
    author: 'Dev Learner',
    category: 'Technology',
    content: `
      <p class="lead">Full stack development offers the exciting opportunity to work on both the frontend and backend of web applications. It's a challenging but rewarding field that requires continuous learning and adaptability.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Understanding the Stack</h3>
      <p>Full stack typically refers to the combination of frontend (client-side) and backend (server-side) technologies. Frontend involves HTML, CSS, and JavaScript frameworks like React or Vue.js. Backend includes server-side languages like Node.js, databases like MongoDB or PostgreSQL, and APIs.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Building a Strong Foundation</h3>
      <p>Start with the basics: Learn HTML for structure, CSS for styling, and JavaScript for interactivity. Once comfortable, dive into a frontend framework. For backend, choose a language and learn about servers, databases, and RESTful APIs. Tools like Git for version control and VS Code as your IDE are essential.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Learning Journey</h3>
      <p>Begin with small projects to apply your knowledge. Build a personal portfolio website, then move to more complex applications like a blog or e-commerce site. Online resources like freeCodeCamp, MDN Web Docs, and YouTube tutorials are invaluable. Don't forget to join developer communities for support and networking.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Best Practices and Mindset</h3>
      <p>Emphasize clean code, responsive design, and security best practices. Stay curious and keep learning—technologies evolve rapidly. Remember, every expert was once a beginner. Be patient with yourself, and celebrate small victories along the way.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Career Prospects</h3>
      <p>Full stack developers are in high demand. With experience, you can work as a freelance developer, join startups, or work for established tech companies. The field offers flexibility, creativity, and the satisfaction of building complete applications from scratch.</p>
    `,
  },
  {
    title: 'A Deep Dive into Tailwind CSS: Utility-First Styling',
    excerpt: 'Exploring the philosophy, features, and practical applications of Tailwind CSS for modern web development.',
    imageUrl: '/Tailwindcss.jpeg',
    createdAt: new Date('2024-04-01'),
    author: 'CSS Enthusiast',
    category: 'Technology',
    content: `
      <p class="lead">Tailwind CSS has revolutionized how we approach styling in web development. Its utility-first philosophy challenges traditional CSS methodologies and offers a fresh perspective on building user interfaces.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">What is Utility-First CSS?</h3>
      <p>Unlike traditional CSS frameworks that provide pre-built components, Tailwind CSS offers low-level utility classes that you can combine to build custom designs. Instead of writing custom CSS, you apply classes directly in your HTML like 'bg-blue-500' for background color or 'text-center' for text alignment.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Key Features and Benefits</h3>
      <p>Tailwind's design system includes a comprehensive set of utilities for colors, spacing, typography, and more. It promotes consistency through its design tokens and responsive prefixes. The biggest advantage is rapid prototyping—you can style elements without leaving your HTML.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Customization and Configuration</h3>
      <p>Tailwind is highly customizable. You can extend the default theme, add custom utilities, and even create your own design system. The configuration file allows you to define your brand colors, fonts, and spacing scale, ensuring consistency across your project.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Performance Considerations</h3>
      <p>One common concern is file size, but Tailwind's purge feature removes unused CSS in production. Modern build tools like Vite integrate seamlessly with Tailwind, ensuring optimal performance. The framework is designed to be fast and efficient.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Learning Curve and Adoption</h3>
      <p>While the initial learning curve exists, the payoff is significant. Developers familiar with CSS pick it up quickly. Many teams have adopted Tailwind for its productivity gains and maintainability. It's particularly popular in React and Vue.js ecosystems.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Best Practices</h3>
      <p>Use Tailwind's @apply directive for reusable component classes. Leverage responsive prefixes for mobile-first design. Combine utilities thoughtfully to avoid overly complex class lists. Remember, Tailwind doesn't replace CSS knowledge—it enhances it.</p>
    `,
  },
];

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding blogs');
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');
    await Blog.insertMany(sampleBlogs);
    console.log('Inserted sample blogs');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error seeding blogs:', err);
  });
