import { NextResponse } from 'next/server';

export async function GET() {
  const comprehensiveProfile = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rui Valente",
    "alternateName": "ruivalente99",
    "jobTitle": "Software Engineer",
    "description": "Passionate software engineer specializing in React, TypeScript, Next.js, and modern web development. Currently Frontend Engineer at Openvia with expertise in scalable application development and team mentoring.",
    
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "email@ruivalente.com",
      "url": "https://ruivalente.com",
      "contactType": "professional"
    },
    
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Portugal"
    },
    
    "worksFor": {
      "@type": "Organization",
      "name": "Openvia",
      "url": "https://openvia.io",
      "description": "Current employer since 2022"
    },
    
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University",
      "description": "Informatics/Computer Science background"
    },
    
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Frontend Engineer",
        "description": "Leading modern web application development with React and TypeScript",
        "occupationLocation": {
          "@type": "Organization",
          "name": "Openvia",
          "url": "https://openvia.io"
        },
        "startDate": "2022",
        "skills": [
          "React development and component architecture",
          "TypeScript for type-safe development",
          "Modern JavaScript ES6+ features",
          "Scalable frontend architecture design",
          "Performance optimization techniques",
          "Code review and quality assurance",
          "Team mentoring and leadership",
          "Agile development practices"
        ],
        "responsibilities": [
          "Leading development of modern web applications",
          "Implementing scalable React/TypeScript architecture",
          "Achieving significant performance improvements",
          "Maintaining comprehensive code coverage with testing",
          "Implementing zero-downtime CI/CD deployments",
          "Mentoring junior developers",
          "Establishing code review standards",
          "Contributing to agile process improvements"
        ]
      },
      {
        "@type": "Occupation", 
        "name": "Software Engineer Trainee",
        "description": "Comprehensive software engineering training program",
        "occupationLocation": {
          "@type": "Organization",
          "name": "Neoception",
          "url": "https://www.neoception.com/"
        },
        "startDate": "2021",
        "endDate": "2022",
        "achievements": [
          "Successfully delivered first production deployment",
          "Completed comprehensive development program",
          "Achieved excellent project completion rates",
          "Developed business-level English proficiency",
          "Transformed from novice to confident developer"
        ]
      }
    ],
    
    "knowsAbout": [
      {
        "category": "Frontend Development",
        "technologies": [
          {
            "name": "React",
            "description": "Primary framework for building user interfaces and single-page applications",
            "experienceLevel": "Expert",
            "yearsOfExperience": "3+"
          },
          {
            "name": "TypeScript", 
            "description": "Type-safe JavaScript development for maintainable and scalable code",
            "experienceLevel": "Expert",
            "yearsOfExperience": "2+"
          },
          {
            "name": "Next.js",
            "description": "Full-stack React framework for production-ready applications",
            "experienceLevel": "Advanced",
            "yearsOfExperience": "2+"
          },
          {
            "name": "JavaScript",
            "description": "Modern JavaScript ES6+ features and best practices",
            "experienceLevel": "Expert",
            "yearsOfExperience": "3+"
          }
        ]
      },
      {
        "category": "Styling & Design",
        "technologies": [
          {
            "name": "CSS3",
            "description": "Advanced styling, animations, and responsive design",
            "experienceLevel": "Advanced"
          },
          {
            "name": "Tailwind CSS",
            "description": "Utility-first CSS framework for rapid UI development",
            "experienceLevel": "Advanced"
          },
          {
            "name": "Bootstrap",
            "description": "Component-based responsive design framework",
            "experienceLevel": "Advanced"
          }
        ]
      },
      {
        "category": "Backend & APIs",
        "technologies": [
          {
            "name": "Node.js",
            "description": "Server-side JavaScript runtime for backend development",
            "experienceLevel": "Intermediate"
          },
          {
            "name": "GraphQL",
            "description": "Query language and runtime for APIs",
            "experienceLevel": "Intermediate"
          },
          {
            "name": "REST APIs",
            "description": "RESTful web services design and implementation",
            "experienceLevel": "Advanced"
          }
        ]
      }
    ],
    
    "sameAs": [
      "https://github.com/ruivalente99",
      "https://linkedin.com/in/ruivalente99",
      "https://twitter.com/ruivalente99"
    ],
    
    "image": "https://ruivalente.com/avatar.png",
    "url": "https://ruivalente.com",
    
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Frontend Development Services",
        "description": "Professional frontend development services specializing in React, TypeScript, and modern web applications",
        "category": "Software Development",
        "serviceType": [
          "React Application Development",
          "TypeScript Implementation",
          "Next.js Full-Stack Development",
          "Frontend Architecture Design",
          "Performance Optimization",
          "Code Review and Quality Assurance",
          "Team Mentoring and Training",
          "Technical Consulting"
        ]
      }
    },
    
    "mainEntityOfPage": {
      "@type": "WebPage",
      "name": "Rui Valente Portfolio",
      "description": "Professional portfolio showcasing software engineering expertise, projects, and experience",
      "url": "https://ruivalente.com"
    },
    
    "significantWork": [
      {
        "@type": "SoftwareApplication",
        "name": "Lazy Life",
        "description": "AI-powered sustainability platform gamifying eco-friendly lifestyle choices",
        "applicationCategory": "Web Application",
        "operatingSystem": "Web Browser",
        "programmingLanguage": ["React", "Next.js", "TypeScript", "JavaScript"],
        "url": "https://lazy-life.vercel.app/",
        "codeRepository": "https://github.com/ruivalente99/lazy-life",
        "features": [
          "AI-powered recommendation algorithms",
          "Gamification elements for user engagement", 
          "Real-time data processing",
          "Progressive Web App capabilities",
          "Sustainable technology focus"
        ]
      }
    ],
    
    "personalityTraits": [
      "Passionate about clean code and best practices",
      "Strong focus on user experience and performance",
      "Enjoys mentoring and knowledge sharing",
      "Committed to sustainable technology solutions",
      "Detail-oriented with problem-solving mindset",
      "Effective collaborator in cross-functional teams"
    ],
    
    "professionalPhilosophy": "Drink bugs and solve coffee - combining technical excellence with a sense of humor while building scalable, user-focused applications that make a positive impact.",
    
    "careerHighlights": [
      "Rapid progression from trainee to frontend engineer with leadership responsibilities",
      "Successfully mentoring junior developers and establishing team standards",
      "Building sustainable technology solutions with real-world impact",
      "Expertise in modern React ecosystem and TypeScript development",
      "Experience in both startup and enterprise development environments"
    ]
  };

  return NextResponse.json(comprehensiveProfile, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
