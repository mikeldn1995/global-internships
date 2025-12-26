import { NextResponse } from 'next/server';
import { validateSession, getSessionFromCookies } from '@/lib/auth';
import { query, initDatabase } from '@/lib/db';

const EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b95b8446?w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
];

const LONDON_EVENTS = [
  'London Tech Week',
  'TechCrunch Disrupt London',
  'London Fintech Summit',
  'AI & Machine Learning Conference',
  'London Startup Showcase',
  'Women in Tech London',
  'London Blockchain Summit',
  'Tech Innovation Forum',
];

const NYC_EVENTS = [
  'NYC Tech Summit',
  'New York Fintech Week',
  'TechCrunch Disrupt NYC',
  'NYC Startup Week',
  'Women Who Code NYC',
  'NYC AI Conference',
  'Silicon Alley Tech Meetup',
  'NYC Innovation Summit',
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateContent(eventName: string, city: string): string {
  const cityName = city === 'London' ? 'London' : 'New York';
  const location = city === 'London' ? 'the heart of London' : 'downtown New York';
  const universities = city === 'London' 
    ? ['Imperial College London', 'University College London', 'King\'s College London', 'London School of Economics']
    : ['Columbia University', 'New York University', 'Cornell University', 'Fordham University'];
  const companies = city === 'London'
    ? ['Revolut', 'Monzo', 'Deliveroo', 'DeepMind', 'Palantir']
    : ['Goldman Sachs', 'JPMorgan Chase', 'Spotify', 'Etsy', 'Bloomberg'];
  
  return `
    <h2>Global Internships at ${eventName}</h2>
    <p>We're thrilled to share our recent participation in ${eventName}, one of the most exciting tech events in ${cityName}. Our team from Global Internships had an incredible experience connecting with students, industry leaders, and innovative companies throughout the event. The energy and enthusiasm at the event were palpable, and we're excited to share the highlights with you.</p>
    
    <h3>Event Overview</h3>
    <p>The ${eventName} brought together thousands of professionals, entrepreneurs, and students from around the world. Held in ${location}, the event showcased the latest innovations in technology, from artificial intelligence and machine learning to fintech and blockchain. Our booth was strategically located in the main exhibition hall, where we had the opportunity to interact with attendees throughout the three-day event.</p>
    
    <p>The event featured keynote speeches from industry leaders, panel discussions on emerging technologies, and numerous networking opportunities. For our team, it was the perfect setting to connect with both students seeking internships and companies looking for talented interns.</p>
    
    <h3>Event Highlights</h3>
    <p>Throughout the event, we had the opportunity to engage with a diverse range of participants. Our booth was buzzing with activity from the moment the doors opened. We met with students from leading universities including ${universities.join(', ')}, and many others who are eager to explore internship opportunities at top tech companies.</p>
    
    <p>Some of the key highlights from our participation include:</p>
    <ul>
      <li>Connecting with over 200 students interested in tech internships across various fields</li>
      <li>Networking with representatives from major tech companies including Google, Amazon, Microsoft, ${companies.join(', ')}, and many innovative startups</li>
      <li>Hosting three informative sessions about internship opportunities in ${cityName}, each attended by 50+ students</li>
      <li>Sharing success stories from our current and past interns, which generated significant interest</li>
      <li>Collecting over 150 contact forms from students interested in our internship matching services</li>
    </ul>
    
    <h3>Student Engagement</h3>
    <p>One of the most rewarding aspects of the event was meeting so many talented and motivated students. We spoke with computer science majors from ${universities[0]}, business students from ${universities[1]}, engineering students from ${universities[2]}, and many others who are looking to gain valuable experience in the tech industry.</p>
    
    <p>Our team was particularly impressed by the enthusiasm and preparation of the students. Many came with well-researched questions about specific companies, internship programs, and career paths. We had in-depth conversations about what companies are looking for in interns, how to prepare for technical interviews, and what to expect during an internship program.</p>
    
    <p>Several students shared their personal projects and portfolios with us, demonstrating their passion for technology and their commitment to building their skills. This level of engagement shows the growing importance of internships in today's competitive job market, and we're proud to be part of helping these students achieve their career goals.</p>
    
    <h3>Industry Connections</h3>
    <p>${eventName} provided an excellent platform for us to strengthen our relationships with tech companies in ${cityName}. We met with hiring managers, talent acquisition teams, and founders who are actively looking for talented interns to join their teams. These conversations were invaluable for understanding current market trends and the specific needs of different companies.</p>
    
    <p>Several companies expressed interest in partnering with Global Internships to provide more internship opportunities. We discussed potential collaboration models, including structured internship programs, mentorship opportunities, and pathways to full-time employment. These partnerships are crucial for expanding the range of options available to our students and ensuring they can find placements that align with their career goals and interests.</p>
    
    <p>One particularly exciting development was a conversation with a fintech startup that's planning to expand their internship program. They're looking to hire 20 interns over the next year, and we're working with them to ensure our students have access to these opportunities. This is exactly the kind of partnership that makes a real difference in students' lives.</p>
    
    <h3>Key Takeaways</h3>
    <p>The event reinforced several important insights about the internship landscape in ${cityName}:</p>
    <ul>
      <li><strong>Growing Demand:</strong> There's an increasing demand for tech internships, with companies recognizing the value that interns bring to their teams. Many companies are expanding their internship programs to attract top talent early in their careers.</li>
      <li><strong>Diverse Opportunities:</strong> From fintech to AI, from startups to established companies, the range of opportunities continues to expand. Students have more choices than ever before, which is great news for finding the perfect fit.</li>
      <li><strong>Student Preparedness:</strong> Students are more prepared than ever, with many having completed relevant coursework, personal projects, and even previous internships. This preparation makes them more competitive and valuable to employers.</li>
      <li><strong>Remote Flexibility:</strong> Many companies are offering hybrid or fully remote internship options, making opportunities more accessible to students regardless of their location. This trend has opened up new possibilities for students who might not be able to relocate.</li>
      <li><strong>Focus on Skills:</strong> Companies are increasingly focused on practical skills and problem-solving abilities rather than just academic credentials. This levels the playing field for students from diverse backgrounds.</li>
    </ul>
    
    <h3>Success Stories Shared</h3>
    <p>During the event, we shared several success stories that resonated with attendees. One of our interns recently secured a position at a leading fintech company in ${location} after completing a summer internship. The student, who came from ${universities[0]}, impressed the company so much during their internship that they were offered a full-time position before graduation.</p>
    
    <p>Another student from ${universities[1]} is now working on cutting-edge AI projects at a startup in ${location === 'the heart of London' ? 'Canary Wharf' : 'Silicon Alley'}. Their internship experience not only gave them valuable technical skills but also helped them build a professional network that led to their current role.</p>
    
    <p>We also shared the story of a student who completed internships at two different companies through our program, gaining experience in both software development and product management. This diverse experience helped them land a role at a major tech company, where they're now working on products used by millions of people.</p>
    
    <p>These stories highlight the transformative power of internships. Not only do they provide valuable work experience, but they also open doors to full-time opportunities and help students build professional networks that last throughout their careers. Many of our interns stay in touch with their mentors and colleagues long after their internships end, creating lasting professional relationships.</p>
    
    <h3>Panel Discussions and Sessions</h3>
    <p>As part of ${eventName}, we had the opportunity to participate in several panel discussions and host our own informational sessions. One panel focused on "The Future of Tech Internships," where we discussed trends in remote work, the importance of mentorship, and how internships are evolving to meet the needs of both students and companies.</p>
    
    <p>Our team also hosted three sessions specifically for students interested in internships. These sessions covered topics such as how to write a compelling CV, how to prepare for technical interviews, what to expect during an internship, and how to make the most of the experience. Each session was well-attended, with students asking thoughtful questions and engaging in meaningful discussions.</p>
    
    <p>One session that was particularly popular focused on "Navigating the Internship Application Process." We walked students through the entire process, from finding opportunities to submitting applications to preparing for interviews. Many students told us afterward that this session gave them the confidence they needed to start applying for internships.</p>
    
    <h3>Networking Opportunities</h3>
    <p>The networking opportunities at ${eventName} were exceptional. We attended several evening receptions where we had the chance to connect with company representatives in a more relaxed setting. These informal conversations often led to deeper discussions about potential partnerships and internship opportunities.</p>
    
    <p>We also organized a small networking event specifically for students and company representatives. This event provided a unique opportunity for students to meet potential employers in a low-pressure environment. The feedback from both students and companies was overwhelmingly positive, and we're planning to organize similar events in the future.</p>
    
    <h3>Looking Forward</h3>
    <p>As we reflect on ${eventName}, we're excited about the future of internships in ${cityName}. The tech ecosystem continues to grow, and with it, the opportunities for students to gain meaningful experience. We're committed to helping more students connect with these opportunities and supporting them throughout their internship journey.</p>
    
    <p>The connections we made at this event will benefit our students for months to come. We're already following up with several companies about specific internship opportunities, and we're excited to share these with our students in the coming weeks.</p>
    
    <p>If you're a student interested in tech internships in ${cityName}, we encourage you to reach out to us. Our team is here to help you find the perfect opportunity that matches your skills, interests, and career goals. Whether you're interested in software development, data science, product management, cybersecurity, or any other tech field, we can help you navigate the internship landscape.</p>
    
    <h3>Get Involved</h3>
    <p>Events like ${eventName} are just one way we stay connected with the tech community in ${cityName}. We regularly attend meetups, conferences, and networking events to ensure we're always up-to-date with the latest trends and opportunities. Our presence at these events allows us to maintain strong relationships with both students and companies, which ultimately benefits everyone involved.</p>
    
    <p>If you're a company looking to host interns or a student looking for opportunities, we'd love to hear from you. Together, we can build a stronger tech community in ${cityName} and create more pathways for students to launch their careers. Our team is always open to new partnerships and collaborations that help students achieve their goals.</p>
    
    <p>We're also planning to host our own events in the coming months, including workshops on interview preparation, networking sessions, and information sessions about specific internship opportunities. Stay tuned to our website and social media channels for updates on these events.</p>
    
    <h3>Conclusion</h3>
    <p>${eventName} was a tremendous success for Global Internships. We're grateful for the opportunity to participate and connect with so many talented students and innovative companies. The event reinforced our commitment to helping students find meaningful internship experiences that launch their careers in technology.</p>
    
    <p>As we continue to grow and expand our services, events like this remind us of the importance of building strong relationships within the tech community. We're excited about the opportunities ahead and look forward to helping more students achieve their career goals through exceptional internship experiences.</p>
    
    <p>Stay tuned for more updates from our team as we continue to participate in events across ${cityName} and help connect talented students with amazing internship opportunities. If you have any questions or would like to learn more about our services, please don't hesitate to reach out!</p>
  `.trim();
}

export async function POST() {
  try {
    const token = await getSessionFromCookies();
    const isAuthenticated = await validateSession(token);

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await initDatabase();
    
    // Clear existing blogs
    await query('DELETE FROM blogs');

    const today = new Date();
    const blogs = [];
    
    // Generate 15 blogs, spaced 30-45 days apart, going back in time
    for (let i = 0; i < 15; i++) {
      const daysAgo = (i + 1) * 35 + Math.floor(Math.random() * 15); // 35-50 days between each
      const publishedDate = new Date(today);
      publishedDate.setDate(publishedDate.getDate() - daysAgo);
      
      const city = i % 2 === 0 ? 'London' : 'New York';
      const events = city === 'London' ? LONDON_EVENTS : NYC_EVENTS;
      const eventName = events[i % events.length];
      
      // Make each blog unique by adding date
      const publishedYear = publishedDate.getFullYear();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = monthNames[publishedDate.getMonth()];
      
      const title = `Global Internships at ${eventName} ${monthName} ${publishedYear}`;
      const slug = generateSlug(title) + `-${i + 1}`;
      const content = generateContent(eventName, city);
      const excerpt = `Our team recently participated in ${eventName}, connecting with students and tech companies in ${city}. Read about our experience and the exciting opportunities we discovered.`;
      // Ensure every blog gets a unique image
      const image_url = EVENT_IMAGES[i] || EVENT_IMAGES[i % EVENT_IMAGES.length];
      
      await query(
        `INSERT INTO blogs (title, slug, content, excerpt, image_url, published_date)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [title, slug, content, excerpt, image_url, publishedDate.toISOString()]
      );
      
      blogs.push({ title });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${blogs.length} blogs!`,
      blogs: blogs.map(b => b.title)
    });
  } catch (error: any) {
    console.error('Error seeding blogs:', error);
    return NextResponse.json(
      { error: 'Failed to seed blogs', details: error.message },
      { status: 500 }
    );
  }
}

