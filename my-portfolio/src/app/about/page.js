"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CodeBracketIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  MapPinIcon,
  CalendarIcon,
  EnvelopeIcon,
  DocumentArrowDownIcon,
  CheckBadgeIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = {
    frontend: [
      { name: "React", level: 95, color: "bg-blue-500" },
      { name: "Next.js", level: 90, color: "bg-black" },
      { name: "TypeScript", level: 85, color: "bg-blue-600" },
      { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
      { name: "JavaScript", level: 95, color: "bg-yellow-500" },
      { name: "HTML/CSS", level: 98, color: "bg-orange-500" },
    ],
    backend: [
      { name: "Node.js", level: 88, color: "bg-green-600" },
      { name: "Python", level: 85, color: "bg-blue-400" },
      { name: "Express.js", level: 87, color: "bg-gray-600" },
      { name: "FastAPI", level: 80, color: "bg-teal-600" },
      { name: "REST APIs", level: 90, color: "bg-purple-600" },
      { name: "GraphQL", level: 75, color: "bg-pink-500" },
    ],
    database: [
      { name: "MongoDB", level: 85, color: "bg-green-500" },
      { name: "PostgreSQL", level: 82, color: "bg-blue-700" },
      { name: "Redis", level: 78, color: "bg-red-600" },
      { name: "Firebase", level: 80, color: "bg-yellow-600" },
    ],
    tools: [
      { name: "Git", level: 90, color: "bg-orange-600" },
      { name: "Docker", level: 75, color: "bg-blue-500" },
      { name: "AWS", level: 70, color: "bg-yellow-500" },
      { name: "Vercel", level: 85, color: "bg-black" },
    ],
  };

  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Innovation Inc.",
      period: "2022 - Present",
      description:
        "Led development of scalable web applications serving 100K+ users. Built microservices architecture and mentored junior developers.",
      technologies: ["React", "Node.js", "AWS", "MongoDB"],
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2021 - 2022",
      description:
        "Developed e-commerce platforms and CRM systems. Improved application performance by 40% through optimization.",
      technologies: ["Next.js", "Python", "PostgreSQL", "Docker"],
    },
    {
      title: "Frontend Developer",
      company: "Creative Agency Co.",
      period: "2020 - 2021",
      description:
        "Created responsive web interfaces and interactive user experiences for diverse clients across various industries.",
      technologies: ["React", "TypeScript", "Tailwind", "Firebase"],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      year: "2020",
      description: "Specialized in Software Engineering and Database Systems",
    },
    {
      degree: "Full-Stack Web Development Bootcamp",
      institution: "Code Academy Pro",
      year: "2019",
      description: "Intensive 6-month program covering modern web technologies",
    },
  ];

  const interests = [
    {
      icon: CodeBracketIcon,
      name: "Open Source",
      description: "Contributing to developer tools",
    },
    {
      icon: RocketLaunchIcon,
      name: "Tech Innovation",
      description: "Exploring AI and blockchain",
    },
    {
      icon: AcademicCapIcon,
      name: "Teaching",
      description: "Mentoring aspiring developers",
    },
    {
      icon: HeartIcon,
      name: "Fitness",
      description: "Running and yoga enthusiast",
    },
  ];

  const certifications = [
    "AWS Certified Developer",
    "Google Cloud Professional",
    "MongoDB Certified Developer",
    "Meta React Developer",
  ];

  const tabs = [
    { id: "skills", label: "Skills", icon: CodeBracketIcon },
    { id: "experience", label: "Experience", icon: BriefcaseIcon },
    { id: "education", label: "Education", icon: AcademicCapIcon },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  About Methmal
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                Passionate Full-Stack Developer &
                <span className="text-blue-600"> Problem Solver</span>
              </h1>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with{" "}
                  <strong>3+ years</strong> of experience creating digital
                  solutions that make a real difference. I specialize in
                  building scalable web applications using modern technologies
                  like React, Node.js, and Python.
                </p>
                <p>
                  My journey started during university when I built my first web
                  application - a student management system that helped
                  streamline administrative processes. That moment sparked my
                  love for creating technology that solves real-world problems.
                </p>
                <p>
                  When I'm not coding, you can find me contributing to
                  open-source projects, mentoring junior developers, exploring
                  the latest tech trends, or staying active through running and
                  yoga.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">3+</div>
                  <div className="text-sm text-gray-600">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">20+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPinIcon className="w-5 h-5 text-blue-500" />
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                  <span>hello@methmal.dev</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                  <span>Available for projects</span>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-2xl">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-48 h-48 rounded-full overflow-hidden mb-4 mx-auto">
                          <Image
                            src="/me.jpg" 
                            alt="Methmal"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <p className="text-gray-600 font-medium">
                        Dasun Methmal
                    
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center space-x-2">
                    <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Available
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float animation-delay-1000">
                  <div className="flex items-center space-x-2">
                    <CodeBracketIcon className="w-6 h-6 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Full-Stack Dev
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-2xl p-2 inline-flex space-x-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-12">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="space-y-6">
                  <h3 className="text-2xl font-bold text-black capitalize flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CodeBracketIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>{category} Development</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillList.map((skill) => (
                      <div
                        key={skill.name}
                        className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-gray-800">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Certifications */}
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-black mb-6 flex items-center space-x-2">
                  <CheckBadgeIcon className="w-8 h-8 text-green-500" />
                  <span>Certifications</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-3">
                      <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-black text-center mb-12">
                Professional Experience
              </h3>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div key={job.title} className="relative">
                    {index !== experience.length - 1 && (
                      <div className="absolute left-6 top-16 w-px h-full bg-gradient-to-b from-blue-500 to-transparent" />
                    )}

                    <div className="flex space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-semibold text-black">
                              {job.title}
                            </h4>
                            <p className="text-blue-600 font-medium">
                              {job.company}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">
                            {job.period}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">{job.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-black text-center mb-12">
                Education & Learning
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-black mb-2">
                          {edu.degree}
                        </h4>
                        <p className="text-blue-600 font-medium mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">{edu.year}</p>
                        <p className="text-gray-600">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Beyond Coding
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest) => {
              const IconComponent = interest.icon;
              return (
                <div
                  key={interest.name}
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {interest.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {interest.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to bring your ideas to life? Download my CV or get in touch to
            discuss your next project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
              Download CV
            </a>

            <a
              href="#contact"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-blue-200 hover:bg-blue-50"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
