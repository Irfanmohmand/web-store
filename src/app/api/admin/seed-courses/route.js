import addCourse from "@/models/Courses";
import authOptions from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const courses = [
  {
    title: "HTML, CSS, JavaScript & Tailwind CSS - Complete Frontend Bundle",
    shortDes:
      "Master the fundamentals of web development with HTML, CSS, JavaScript, and modern Tailwind CSS framework.",
    fullDes:
      "This comprehensive course covers everything you need to become a frontend developer. Start with HTML5 to structure web pages, learn CSS3 for styling and animations, master JavaScript for interactivity, and use Tailwind CSS for rapid UI development. Build real-world projects including responsive websites, landing pages, and interactive web applications. Perfect for beginners who want to start their web development journey.",
    requirements: [
      "A computer with internet connection",
      "Basic computer knowledge",
      "Willingness to learn and practice",
      "No prior programming experience required",
    ],
    courseCon: [
      "HTML5 - Semantic markup, forms, and accessibility",
      "CSS3 - Flexbox, Grid, animations, and responsive design",
      "JavaScript - ES6+, DOM manipulation, events, and async programming",
      "Tailwind CSS - Utility-first CSS framework",
      "Build 5+ real-world projects",
      "Responsive web design principles",
      "Browser DevTools and debugging",
      "Best practices and modern workflows",
    ],
    price: "6999",
    bulletPoints: [
      "Complete HTML5 from basics to advanced",
      "Master CSS3 including Flexbox and Grid",
      "Learn JavaScript ES6+ features",
      "Build responsive websites with Tailwind CSS",
      "Create 5+ portfolio-ready projects",
      "Lifetime access to course materials",
      "Certificate of completion",
    ],
    file: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
  },
  {
    title: "MongoDB - Complete Database Mastery",
    shortDes:
      "Learn MongoDB from scratch - the most popular NoSQL database for modern web applications.",
    fullDes:
      "Dive deep into MongoDB, the leading NoSQL database. Learn how to design schemas, perform CRUD operations, use aggregation pipelines, and optimize queries. Understand indexing, data modeling, and best practices for production applications. Work with MongoDB Atlas cloud database and integrate MongoDB with Node.js applications. Perfect for developers who want to master database management.",
    requirements: [
      "Basic JavaScript knowledge",
      "Understanding of databases (helpful but not required)",
      "Computer with internet connection",
      "Willingness to practice with real databases",
    ],
    courseCon: [
      "MongoDB fundamentals and architecture",
      "CRUD operations (Create, Read, Update, Delete)",
      "Data modeling and schema design",
      "Aggregation framework and pipelines",
      "Indexing and query optimization",
      "MongoDB Atlas cloud database",
      "Integration with Node.js and Mongoose",
      "Security and authentication",
      "Backup and restore strategies",
      "Real-world project implementation",
    ],
    price: "3999",
    bulletPoints: [
      "Master MongoDB from basics to advanced",
      "Learn data modeling and schema design",
      "Use aggregation pipelines effectively",
      "Optimize queries with indexing",
      "Work with MongoDB Atlas cloud",
      "Integrate with Node.js applications",
      "Build a complete CRUD application",
      "Lifetime access and updates",
    ],
    file: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
  },
  {
    title: "Next.js - Modern React Framework",
    shortDes:
      "Build production-ready React applications with Next.js - Server-side rendering, API routes, and more.",
    fullDes:
      "Master Next.js, the most powerful React framework for production applications. Learn server-side rendering (SSR), static site generation (SSG), API routes, file-based routing, and image optimization. Build SEO-friendly, fast, and scalable web applications. Understand App Router, Server Components, and modern Next.js 14+ features. Deploy to Vercel and optimize for performance. Perfect for React developers who want to level up.",
    requirements: [
      "Good understanding of React.js",
      "JavaScript ES6+ knowledge",
      "Basic understanding of Node.js",
      "HTML and CSS fundamentals",
    ],
    courseCon: [
      "Next.js fundamentals and setup",
      "File-based routing system",
      "Server-side rendering (SSR) and Static Site Generation (SSG)",
      "API routes and backend integration",
      "App Router and Server Components",
      "Image optimization and performance",
      "Authentication with NextAuth.js",
      "Database integration (MongoDB, PostgreSQL)",
      "Deployment to Vercel",
      "SEO optimization techniques",
      "Build 3+ production-ready projects",
    ],
    price: "7999",
    bulletPoints: [
      "Master Next.js 14+ features",
      "Build SEO-optimized applications",
      "Learn SSR and SSG techniques",
      "Create API routes and backends",
      "Implement authentication systems",
      "Deploy to production on Vercel",
      "Build 3+ real-world projects",
      "Lifetime access and updates",
    ],
    file: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    title: "Node.js & Express.js - Backend Development Mastery",
    shortDes:
      "Build powerful backend applications and RESTful APIs with Node.js and Express.js.",
    fullDes:
      "Become a backend developer with Node.js and Express.js. Learn to build RESTful APIs, handle authentication, work with databases, and deploy production-ready applications. Master middleware, routing, error handling, and security best practices. Integrate with MongoDB, PostgreSQL, and third-party APIs. Build real-world projects including authentication systems, file uploads, and payment integrations. Perfect for developers who want to master backend development.",
    requirements: [
      "Strong JavaScript fundamentals",
      "Basic understanding of HTTP and APIs",
      "Familiarity with command line",
      "Basic database knowledge (helpful)",
    ],
    courseCon: [
      "Node.js fundamentals and event loop",
      "Express.js framework and routing",
      "RESTful API design and best practices",
      "Middleware and error handling",
      "Authentication and authorization (JWT, sessions)",
      "Database integration (MongoDB, PostgreSQL)",
      "File uploads with Multer and Cloudinary",
      "Email sending with Nodemailer",
      "Payment integration (Stripe)",
      "Security best practices",
      "Testing with Jest and Supertest",
      "Deployment to production (Heroku, AWS, DigitalOcean)",
    ],
    price: "8999",
    bulletPoints: [
      "Master Node.js and Express.js",
      "Build RESTful APIs from scratch",
      "Implement authentication systems",
      "Handle file uploads and emails",
      "Integrate payment gateways",
      "Deploy to production servers",
      "Build 4+ backend projects",
      "Lifetime access and support",
    ],
    file: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
  },
  {
    title: "Full Stack Web Development - MERN Stack Complete",
    shortDes:
      "Become a full stack developer with MongoDB, Express.js, React.js, Node.js, Next.js, and modern tools.",
    fullDes:
      "The ultimate full stack development course covering the complete MERN stack and beyond. Learn MongoDB for databases, Express.js and Node.js for backend, React.js and Next.js for frontend. Master authentication with JWT and NextAuth, file uploads with Cloudinary, email sending with Nodemailer, payment integration with Stripe, and deployment to production. Build 5+ complete full stack applications including e-commerce, social media, and SaaS platforms. This is the only course you need to become a professional full stack developer.",
    requirements: [
      "Basic JavaScript knowledge (we'll cover advanced topics)",
      "Understanding of HTML and CSS",
      "Willingness to learn and build projects",
      "Computer with internet connection",
    ],
    courseCon: [
      "Frontend: HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS",
      "Backend: Node.js, Express.js, RESTful APIs",
      "Database: MongoDB, Mongoose ODM",
      "Authentication: JWT, NextAuth.js, sessions, OAuth",
      "File Management: Cloudinary integration, image/video uploads",
      "Email: Nodemailer, email templates, verification emails",
      "Payments: Stripe integration, subscriptions",
      "State Management: Redux, Context API, Zustand",
      "Real-time: Socket.io for chat and notifications",
      "Testing: Jest, React Testing Library",
      "Deployment: Vercel, Heroku, AWS, MongoDB Atlas",
      "DevOps: Git, GitHub, CI/CD pipelines",
      "Build 5+ production-ready full stack projects",
    ],
    price: "14999",
    bulletPoints: [
      "Complete MERN stack mastery",
      "Build 5+ full stack applications",
      "Master authentication and authorization",
      "Implement file uploads with Cloudinary",
      "Send emails with Nodemailer",
      "Integrate Stripe payments",
      "Deploy to production platforms",
      "Real-time features with Socket.io",
      "State management with Redux",
      "Testing and debugging techniques",
      "Portfolio-ready projects",
      "Lifetime access and updates",
      "Certificate of completion",
      "Job-ready skills",
    ],
    file: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
];

export const POST = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    // Check if user is admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    let addedCount = 0;
    let skippedCount = 0;
    const addedCourses = [];
    const skippedCourses = [];

    for (const course of courses) {
      const exists = await addCourse.findOne({ title: course.title });
      if (exists) {
        skippedCourses.push(course.title);
        skippedCount++;
      } else {
        const newCourse = await addCourse.create(course);
        addedCourses.push(course.title);
        addedCount++;
      }
    }

    return NextResponse.json(
      {
        message: "Courses seeded successfully",
        addedCount,
        skippedCount,
        addedCourses,
        skippedCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ SEED COURSES ERROR:", error);
    return NextResponse.json(
      { message: `Seeding failed: ${error.message}` },
      { status: 500 }
    );
  }
};
