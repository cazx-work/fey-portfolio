export interface Testimonial {
  slug: string;
  quote: string;
  summary: string;
  author: string;
  company: string;
  focusedCompany?: string;
  role: string;
  relationship: string;
  project?: string;
  linkedin?: string;
  themes: string[];
  featured?: boolean;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    slug: 'charlie-engleback',
    quote: `I had the opportunity to work closely with Felix, where he designed and implemented a significant portion of our frontend software. Throughout the project, he consistently demonstrated strong technical ability and an impressive capacity to identify and solve problems quickly, often even when the information available to him was incomplete.

One of Felix's strongest qualities was his willingness to take ownership. He never shied away from responsibility, and I always felt comfortable bringing him into difficult or unexpected problems. He was also honest and realistic when estimating the complexity of his work, while making sure to communicate clearly whenever he encountered obstacles or needed to adjust his approach. That level of transparency made him someone I could rely on when things became challenging.

Felix also had a habit of being one step ahead. There were many occasions where he completed work before I had even asked for it, or identified something that needed to be addressed before I had realized it was necessary. That kind of initiative made a significant difference, particularly during the more chaotic periods of the project.

Beyond his technical contribution, Felix was highly personable, friendly, and assertive. He was someone I genuinely looked forward to working with and having conversations with, and he brought a positive presence to the team.

His reliability was particularly important to the success of the project. We faced a significant amount of uncertainty and challenges along the way, and I genuinely believe that without Felix's consistency and willingness to step up, we would have struggled to get through some of those situations.

Felix is a talented engineer who combines strong technical problem-solving with ownership, reliability, initiative, and excellent collaboration. He is easy to work with, someone you can trust with difficult problems, and I would highly recommend him to any team.`,
    summary:
      'Felix combined strong frontend engineering with ownership, initiative, reliability, and clear communication throughout a challenging project.',
    author: 'Charlie Engleback',
    company: 'Karno Sound',
    role: 'Head of Software',
    relationship: 'Engineering manager',
    project: 'SEPIA',
    linkedin: 'https://www.linkedin.com/in/charles-engleback-95278a252/',
    themes: ['Ownership', 'Initiative', 'Reliability'],
    avatar: '/images/testimonials/charlie_engleback.jpg',
    featured: true,
  },
  {
    slug: 'max-beadnell',
    quote: `What stood out most to me about Felix was his positive attitude and dependability. He was always willing to help, no matter the hour, and approached his work with dedication and a friendly attitude.

  Felix was especially valuable during crunch periods when we needed to deliver releases under very tight deadlines. He remained dependable and worked well under pressure, helping the team push through demanding situations.

  I would recommend Felix for a Senior Software Engineer role because he is a highly capable team player with strong problem-solving skills. He is someone you can rely on when the work gets difficult and the team needs to deliver.`,
    summary:
      'Felix stood out for his positive attitude, dependability, and ability to solve problems and support the team under tight release deadlines.',
    author: 'Max Beadnell',
    company: 'Karno Sound',
    role: 'Technical Specialist',
    relationship: 'Technical colleague',
    project: 'SEPIA',
    linkedin: 'https://www.linkedin.com/in/max-beadnell-11a0b1244/',
    themes: ['Reliability', 'Problem solving'],
    avatar: '/images/testimonials/max_beadnell.jpeg',
    featured: true,
  },
  {
    slug: 'qiaoni-zhang',
    quote:
      'I worked with Felix on the SEPIA software platform, where I was responsible for the UI/UX design while he worked on the engineering side. As a designer, I really appreciated how easy he was to collaborate with. He was always happy to discuss implementation details, clearly explained technical constraints, and worked with me to find solutions that balanced the design vision with what was technically achievable.\n\nWhat stood out to me was that he genuinely cared about building a polished product rather than simply implementing requirements. He was receptive to feedback, communicated well throughout iterations, and helped make the design-to-development process straightforward and efficient. Felix is a reliable and thoughtful engineer who is enjoyable to work with, and I would confidently recommend him for a Senior Software Engineer role.',
    summary:
      'Felix made the design-to-development process on SEPIA collaborative and efficient by communicating technical constraints clearly, welcoming feedback, and working toward a polished product.',
    author: 'Qiaoni Zhang',
    company: 'Karno Sound',
    role: 'UI/UX Designer',
    relationship: 'Design colleague',
    project: 'SEPIA',
    linkedin: 'https://www.linkedin.com/in/qiaoni-zhang-graphicdesign/',
    themes: ['Design collaboration', 'Product quality'],
    avatar: '/images/testimonials/qiaoni_zhang.jpeg',
    featured: true,
  },
  {
    slug: 'sarah-jane-norman',
    quote:
      "Although I wasn't Felix's direct technical manager, I had the pleasure to observe him within the organisation and always had a very positive impression. He is an extremely respectful, loyal, and dedicated individual who consistently approached his work with commitment and professionalism. We operated in demanding, fast-paced environments where the pressure could be significant, and he remained dependable, calm, and focused throughout. He showed initiative, took ownership of his responsibilities, and was someone who could be trusted to get on with the job without needing close supervision. He built strong working relationships across different teams, communicated well with people at all levels, and was genuinely supportive of those around him. From my perspective, he combined strong technical ability with a practical, collaborative approach and made a positive contribution to both the team and the wider business. Based on what I observed, I would have no hesitation in recommending him to another organisation.",
    summary:
      'Felix is a dependable and respectful engineer who stays calm under pressure, takes ownership of his work, and builds strong relationships across teams.',
    author: 'Sarah Jane Norman',
    company: 'Karno Sound',
    role: 'General Manager',
    relationship: 'Company leader',
    project: 'SEPIA',
    linkedin: 'https://www.linkedin.com/in/sarah-jane-norman-856005130/',
    themes: ['Ownership', 'Reliability'],
    avatar: '/images/testimonials/sarah_jane_norman.jpeg',
    featured: true,
  },
  {
    slug: 'jerome-villaver',
    quote:
      "I have known Felix since he joined Bluebeans Systems as an intern. Even as a young and eager student, he consistently demonstrated a strong willingness to learn and improve. During his internship, he was assigned several development tasks, all of which he completed on time and with a high level of quality. His positive attitude, curiosity, and commitment to learning made him stand out from the very beginning.\n\nAfter completing his required internship hours, Felix applied to continue with the company as a part-time developer. During this period, he was entrusted with several projects where he consistently showed determination, focus, and professionalism. He actively shared his ideas during discussions, welcomed feedback, and always put forth his best effort to deliver quality work.\n\nUpon graduating, Felix was offered a full-time position and became one of Bluebeans Systems' regular developers. He worked on both mobile and desktop applications, primarily for our queuing system solutions. Throughout his time with the company, he made significant contributions to the development and continuous improvement of these applications. His dedication, technical skills, problem-solving abilities, and strong work ethic helped transform these projects into successful products that the company continues to offer.\n\nThroughout his entire journey at Bluebeans Systems, Felix consistently demonstrated passion, dedication, and a genuine sense of ownership in every project he handled. He is someone who is always willing to learn, collaborate with the team, and go the extra mile to ensure that tasks are completed successfully and that the final product meets high standards.\n\nI have no hesitation in recommending Felix for any software development role. I am confident that his technical abilities, professionalism, and commitment to excellence will make him a valuable asset to any organization fortunate enough to have him on their team.",
    summary:
      'From intern to full-time developer, Felix consistently showed curiosity, professionalism, and ownership while delivering high-quality mobile and desktop applications.',
    author: 'Jerome Villaver',
    company: 'Bluebeans',
    role: 'Project Manager',
    relationship: 'Project manager',
    linkedin: 'https://www.linkedin.com/in/jeromevillaver/',
    themes: ['Career growth', 'Delivery'],
    avatar: '/images/testimonials/jerome_villaver.png',
  },
  {
    slug: 'earl-fortuna',
    quote:
      'Edrian, "Bai Ed" as we call him, is very approachable, friendly, and always brings positive energy to the team. He makes sure that no one feels left out and consistently checks in on his teammates to see how they are doing.\n\nWhen I first joined as a developer after transitioning from a career in mechanical engineering, adjusting to a completely new field could have been challenging. However, Bai Ed made the transition much easier for me. He was always willing to help, provide guidance, and answer questions whenever I needed support.\n\nHe is also a skilled developer who takes ownership of his responsibilities and can always be relied upon to deliver quality work. What stands out most is his willingness to learn and improve. Whenever he encounters challenges or wants to gain a deeper understanding of the product, he actively seeks guidance from senior team members and asks thoughtful questions.\n\nOverall, Bai Ed is an excellent coworker who communicates effectively, takes responsibility for his work, and is someone you can trust. His positive attitude, reliability, and supportive nature make him a valuable member of any team.',
    summary:
      'Felix combines technical reliability with a supportive, approachable nature, helping teammates feel included while taking ownership of quality work and continuous learning.',
    author: 'Earl Fortuna',
    company: 'Kyocera',
    role: 'Software Engineer',
    relationship: 'Engineering colleague',
    linkedin: 'https://www.linkedin.com/in/earll-fortuna/',
    themes: ['Mentorship', 'Team support'],
    avatar: '/images/optimized/testimonials/earl_fortuna.jpg',
  },
  {
    slug: 'jan-erwin-king',
    quote:
      'Working with Felix on the MetaCare project at Xurpas was a great experience. As a developer, he stood out for his strong sense of responsibility and genuine passion for his craft. From the Business Analyst perspective, having a developer who not only takes full ownership of his tasks but is also deeply invested in the quality of the product makes collaboration seamless and effective. Felix is the kind of teammate who consistently delivers and genuinely cares about the work he puts out.',
    summary:
      'On MetaCare, Felix stood out for taking full ownership of his work and caring deeply about product quality, making collaboration seamless and effective.',
    author: 'Jan Erwin King',
    company: 'Xurpas',
    role: 'Business Analyst',
    relationship: 'Product colleague',
    project: 'MetaCare',
    linkedin: 'https://www.linkedin.com/in/jan-erwin-king-1932a4205/',
    themes: ['Ownership', 'Product quality'],
    avatar: '/images/testimonials/jan_erwin_king.jpeg',
  },
  {
    slug: 'rey-mark-engada',
    quote:
      'I was once the argument buddy of this dude, whenever we are fixing problems or have some idea the simple solutions become complex. When we start to brainstorm this "what if" keeps popping up and that discussion from 5mins will take longer, sometimes you might find us fighting but we really are just brainstorming.\n\nFelix is an innovative person and has a wider mindset he keeps thinking in advance preventing the worst before it even ticks.\n\nFelix is solid, I\'ve known this guy for a decade his skills in C#, React, Node, Flutter, and Dart are exceptional, working with this guy is never boring and expect unending brain storm discussion, having Felix in a team is immaculate, it will take away the stress and replace with laughter he knows when to get serious and when to laugh.\n\nIf I get to have a chance working with this guy again one thing I would say without hesitation "I\'m in." 👍',
    summary:
      'Felix brings inventive problem-solving, broad technical skills, and thoughtful debate to a team while keeping collaboration energetic and enjoyable.',
    author: 'Rey Mark Engada',
    company: 'BBS and ED',
    focusedCompany: 'Bluebeans Systems & Experience Digital',
    role: 'Software Engineer',
    relationship: 'Engineering colleague',
    linkedin: 'https://www.linkedin.com/in/rey-mark-engada-155122185/',
    themes: ['Problem solving', 'Technical breadth'],
    avatar: '/images/testimonials/rey_mark_engada.jpeg',
  },
  {
    slug: 'mark-vincent-tangpus',
    quote:
      "Felix was one of the friendliest and most approachable people I worked with at Kyocera. He was easy to work with, always open to ideas, and made collaboration feel comfortable—even when we were working through difficult technical problems or tight requirements.\n\nWhat stood out to me was his creativity as an engineer. I especially remember the work he did on the Device Settings experience, where he created a more customizable UI instead of settling for a rigid, one-size-fits-all approach. He looked for a practical solution that could better adapt to the product's needs, and he was able to turn that idea into something useful for the team and the users.\n\nFelix is also very down to earth. He communicates naturally, listens to other people's perspectives, and does not make collaboration feel complicated. He brings a positive attitude to the work, shares ideas freely, and is someone you can rely on when solving problems together.\n\nOverall, Felix is a creative and dependable software engineer who is friendly, collaborative, and easy to work with. I would be happy to work with him again.",
    summary:
      'Felix is a friendly, down-to-earth engineer who is easy to collaborate with and brings creative, practical solutions to product challenges.',
    author: 'Mark Vincent Tangpus',
    company: 'Kyocera',
    role: 'Software Engineer',
    relationship: 'Engineering colleague',
    project: 'Kyocera Device Manager',
    linkedin: 'https://www.linkedin.com/in/mark-vincent-tangpus/',
    themes: ['Creative problem solving', 'Collaboration'],
    avatar: '/images/optimized/testimonials/mark_vincent_tangpus.png',
  },
];
