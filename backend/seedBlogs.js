const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://nihalanihitesh13_db_user:LhN8E2chhBAab7Us@cluster0.swyrh.mongodb.net/blogcms?retryWrites=true&w=majority';

const sampleBlogs = [
  {
    title: 'A Journey Through VESIT: More Than Just an Engineering College',
    excerpt: 'An immersive experience at Vivekanand Education Society\'s Institute of Technology, exploring academics, culture, and personal growth.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxm12O2yAp1cMyhZhm6VwsPHBChcH6IGDHuvfD6vepOb0sT4-A44dsS8Pz&s=10',
    createdAt: new Date('2024-01-15'),
    author: 'A Proud VESITian',
    category: 'Education',
    views: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
    likes: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
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
    title: 'The Future of AI: How Generative Models are Changing the World',
    excerpt: 'Explore the rapid evolution of Artificial Intelligence and its profound impact on creativity, industry, and daily life.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-12'),
    author: 'Tech Futurist',
    category: 'Technology',
    content: `
      <p class="lead">Artificial Intelligence is no longer a distant sci-fi dream; it is the engine driving the next industrial revolution. From Large Language Models to image generators, the landscape of human productivity is shifting beneath our feet.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Creative Renaissance</h3>
      <p>Generative AI has democratized creativity. Someone with no formal training in graphic design can now generate stunning visuals using tools like Midjourney or DALL-E. Similarly, writers are using AI to brainstorm plots, refine prose, and translate languages with unprecedented speed. This isn't about replacing humans, but augmenting our innate capabilities.</p>

      <p>However, this shift brings up critical questions about copyright and the value of human-made art. As we move forward, the "human touch" might become a premium luxury in a sea of AI-generated content.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Impact on Professional Sectors</h3>
      <p>In healthcare, AI algorithms are diagnosing diseases from medical images with higher accuracy than human specialists. In finance, predictive models are managing risks and identifying fraudulent transactions in milliseconds. Even in software development, AI co-pilots are writing boilerplate code, allowing developers to focus on architecture and complex logic.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Ethics and Governance</h3>
      <p>With great power comes great responsibility. The risks of deepfakes, algorithmic bias, and job displacement are real. Governments around the world are scrambling to create frameworks that encourage innovation while protecting individual rights. The goal is "Human-Centric AI"—technology that serves humanity rather than exploiting it.</p>
    `,
  },
  {
    title: 'My Smart India Hackathon Experience: Innovation Under Pressure',
    excerpt: 'A thrilling account of participating in the Smart India Hackathon, from ideation to implementation.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
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
    title: 'Exploring Scandinavia: A Guide to the Fjords and Northern Lights',
    excerpt: 'Discover the breathtaking natural beauty and minimalist charm of Norway, Sweden, and Denmark.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-06-20'),
    author: 'Global Nomad',
    category: 'Travel',
    content: `
      <p class="lead">There is a specific kind of silence that you can only find in the Scandinavian wilderness. It's the sound of ancient glaciers shifting and the soft rustle of the Aurora Borealis dancing across a pitch-black sky.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Majestic Fjords of Norway</h3>
      <p>Geirangerfjord and Nærøyfjord are UNESCO World Heritage sites for a reason. Sailing through these deep blue waters, surrounded by sheer mountain cliffs and cascading waterfalls like the "Seven Sisters," is a humbling experience. Hiking to Preikestolen (Pulpit Rock) offers a view that will stay with you forever.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Stockholm: The Venice of the North</h3>
      <p>Built on 14 islands, Stockholm perfectly blends history with modern design. The cobblestone streets of Gamla Stan (the Old Town) contrast beautifully with the sleek boutiques of Östermalm. Don't miss the Vasa Museum, which houses a remarkably preserved 17th-century warship.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Hygge in Copenhagen</h3>
      <p>The Danish concept of 'Hygge'—a quality of cosiness and comfortable conviviality—is evident everywhere in Copenhagen. Whether it's enjoying a coffee by the colorful Nyhavn harbor or cycling through the city's extensive bike paths, there's a sense of well-being that is contagious.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Chasing the Aurora</h3>
      <p>To see the Northern Lights, head to Tromsø or Lapland during the winter months. The experience of seeing curtains of green, purple, and red light shimmering above a snow-covered landscape is nothing short of magical. It requires patience and a bit of luck, but the reward is incomparable.</p>
    `,
  },
  {
    title: 'The Art of Mindful Living in a Hyper-Connected World',
    excerpt: 'Practical strategies to reclaim your focus, reduce stress, and find balance in the age of digital distractions.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-07-05'),
    author: 'Serenity Seeker',
    category: 'Lifestyle',
    content: `
      <p class="lead">We live in an era of "continuous partial attention." Our phones ping, our watches vibrate, and our minds are constantly jumping between tabs. Mindfulness is the antidote to this digital chaos.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Start with Your Morning</h3>
      <p>How you spend the first 30 minutes of your day sets the tone for everything else. Instead of reaching for your phone immediately, try 5 minutes of deep breathing or simply gazing out the window while your coffee brews. This small "buffer zone" prevents you from entering a reactive state of mind before you've even brushed your teeth.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">The Power of Single-Tasking</h3>
      <p>Multitasking is a myth. Our brains actually switch rapidly between tasks, losing efficiency with every jump. Try "time-blocking"—dedicating specific chunks of time to a single activity without interruptions. You'll find that the quality of your work improves, and your stress levels decrease.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Digital Detox Rituals</h3>
      <p>Create "no-phone zones" in your home, especially the dining table and the bedroom. Setting a digital sunset—turning off screens an hour before bed—helps your brain produce the melatonin needed for deep, restorative sleep. Reconnect with physical hobbies like reading a paper book, gardening, or cooking a meal from scratch.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Practicing Presence</h3>
      <p>Mindfulness doesn't have to mean sitting on a cushion for hours. It means being fully present in whatever you are doing. When you walk, feel the ground beneath your feet. When you eat, taste every flavor. This presence transforms mundane moments into rich experiences and builds a lasting sense of inner peace.</p>
    `,
  },
  {
    title: 'Getting Started with Full Stack Development: A Beginner\'s Guide',
    excerpt: 'A comprehensive roadmap for aspiring full stack developers, covering essential technologies and best practices.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
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
    `,
  },
  {
    title: 'The Farm-to-Table Movement: Why Local Sourcing Matters',
    excerpt: 'Exploring the benefits of sustainable eating, supporting local farmers, and the journey of food from soil to plate.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-08-14'),
    author: 'Culinary Critic',
    category: 'Food',
    content: `
      <p class="lead">In a world of fast food and global supply chains, the farm-to-table movement is a return to our roots. It's about knowing where your food comes from and celebrating the seasons.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">What is Farm-to-Table?</h3>
      <p>At its core, farm-to-table means that the food on your plate came directly from a local farm, skipping the middleman of long-distance shipping and industrial processing. This ensures maximum freshness and supports the local economy.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Nutritional and Flavor Benefits</h3>
      <p>Produce starts losing nutrients the moment it is harvested. A tomato picked yesterday at a local farm is objectively more nutritious and flavorful than one picked green and ripened in a truck over 3,000 miles. When you eat seasonally, you are eating food at its peak performance.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Environmental Impact</h3>
      <p>The average meal travels thousands of miles before reaching the consumer. By sourcing locally, we drastically reduce the carbon footprint associated with transportation. Furthermore, many small-scale local farmers use organic or regenerative practices that are better for the soil and biodiversity.</p>

      <h3 class="font-bold text-2xl mt-8 mb-4">Supporting Your Community</h3>
      <p>Every dollar spent at a local farm or a farm-to-table restaurant stays in the community. It helps preserve farmland and ensures that future generations have access to fresh, local food. It's a way of voting with your fork for a more sustainable and delicious future.</p>
    `,
  },
  {
    title: 'A Deep Dive into Tailwind CSS: Utility-First Styling',
    excerpt: 'Exploring the philosophy, features, and practical applications of Tailwind CSS for modern web development.',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000',
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
    `,
  },
];

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding blogs');
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    const blogsWithStats = sampleBlogs.map(blog => ({
      ...blog,
      views: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
      likes: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000
    }));

    await Blog.insertMany(blogsWithStats);
    console.log('Inserted sample blogs with random stats');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error seeding blogs:', err);
  });
