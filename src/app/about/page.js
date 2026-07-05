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

  useEffect(() => { setIsVisible(true); }, []);

  const skills = {
    frontend: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 98 },
    ],
    backend: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 85 },
      { name: "Express.js", level: 87 },
      { name: "FastAPI", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
    database: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "Redis", level: 78 },
      { name: "Firebase", level: 80 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Vercel", level: 85 },
    ],
  };

  const experience = [
    {
      title: "Full-Stack Developer",
      company: "DCode Ltd.",
      period: "2021 – 2022",
      description: "Developed e-commerce platforms and CRM systems. Improved application performance by 40% through optimization.",
      technologies: ["Next.js", "Python", "PostgreSQL", "Docker"],
    },
    {
      title: "Frontend Developer",
      company: "DCode Ltd.",
      period: "2025 – Present",
      description: "Building modern frontend experiences and design systems for client-facing products.",
      technologies: ["React", "Tailwind CSS", "TypeScript", "Vite"],
    },
  ];

  const education = [
    {
      degree: "BSc (Hons) in Software Engineering",
      institution: "Cardiff Metropolitan University (UK) – ICBT Campus, Nugegoda",
      year: "2024 – 2025",
      description: "Results Pending",
    },
    {
      degree: "Higher Diploma in Computing & Software Engineering",
      institution: "Cardiff Metropolitan University (UK) – ICBT Campus, Nugegoda",
      year: "2022 – 2024",
      description: "Completed",
    },
    {
      degree: "G.C.E. Advanced Level",
      institution: "Mahanama College (Colombo 03)",
      year: "2020",
      description: "Passed",
    },
    {
      degree: "G.C.E. Ordinary Level",
      institution: "Sri Rajasinghe Central College (Kotikawatta)",
      year: "2017",
      description: "Passed",
    },
  ];

  const interests = [
    { icon: CodeBracketIcon, name: "Open Source", description: "Contributing to developer tools" },
    { icon: RocketLaunchIcon, name: "Tech Innovation", description: "Exploring AI and blockchain" },
    { icon: AcademicCapIcon, name: "Teaching", description: "Mentoring aspiring developers" },
    { icon: HeartIcon, name: "Fitness", description: "Running and yoga enthusiast" },
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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Dasun_Methmal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-[#0b0f19] transition-colors duration-300 pt-16 lg:pt-20">

      {/* ── Hero ── */}
      <section className="relative py-16 lg:py-24 bg-orange-50 dark:bg-[#0f1422] overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-orange-200/30 dark:bg-orange-500/8 filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-300/20 dark:bg-orange-600/6 filter blur-3xl" />

        <div className="relative mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Text */}
            <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 mb-6">
                <SparklesIcon className="w-4 h-4 mr-2" />
                About Methmal
              </span>

              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Passionate Full-Stack Developer &{" "}
                <span className="text-orange-500">Problem Solver</span>
              </h1>

              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                <p>
                  I'm a passionate full-stack developer with{" "}
                  <strong className="text-gray-900 dark:text-white">3+ years</strong> of experience creating
                  digital solutions that make a real difference. I specialize in building scalable web applications
                  using modern technologies like React, Node.js, and Python.
                </p>
                <p>
                  My journey started during university when I built my first web application — a student management
                  system that helped streamline administrative processes.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-white dark:bg-[#141928] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm mb-6">
                {[["50+", "Projects"], ["3+", "Years Exp"], ["20+", "Clients"]].map(([num, label], i) => (
                  <div key={label} className={`text-center ${i === 1 ? "border-x border-gray-200 dark:border-white/10" : ""}`}>
                    <div className="text-2xl font-black text-orange-500">{num}</div>
                    <div className="text-sm text-gray-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Contact chips */}
              <div className="flex flex-wrap gap-4">
                {[
                  { Icon: MapPinIcon, text: "Colombo, Sri Lanka" },
                  { Icon: EnvelopeIcon, text: "dasunmethmal23@gmail.com" },
                  { Icon: CalendarIcon, text: "Available for projects" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <Icon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/10 shadow-2xl flex items-center justify-center p-10">
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-xl mx-auto mb-4">
                    <Image
                      src="/methmal.jpg"
                      alt="Methmal"
                      width={192}
                      height={192}
                      className="object-cover object-[center_15%] w-full h-full"
                    />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-bold">Dasun Methmal</p>
                  <p className="text-orange-500 text-sm font-semibold mt-1">Full-Stack Developer</p>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">Available</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
                <CodeBracketIcon className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">Full-Stack Dev</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills / Experience / Education Tabs ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* Tab bar */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 dark:bg-[#0f1422] border border-gray-100 dark:border-white/5 rounded-2xl p-2 inline-flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 whitespace-nowrap text-sm ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-[#141928] text-orange-500 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
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
                <div key={category}>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white capitalize flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/15 rounded-lg flex items-center justify-center">
                      <CodeBracketIcon className="w-4 h-4 text-orange-500" />
                    </div>
                    {category} Development
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {skillList.map((skill) => (
                      <div key={skill.name} className="bg-white dark:bg-[#0f1422] rounded-2xl p-5 border border-gray-100 dark:border-white/5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-gray-800 dark:text-white">{skill.name}</span>
                          <span className="text-sm text-orange-500 font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-2">
                          <div className="h-2 rounded-full bg-orange-500 transition-all duration-1000 ease-out" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Certifications */}
              <div className="bg-gray-50 dark:bg-[#0f1422] border border-gray-100 dark:border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <CheckBadgeIcon className="w-6 h-6 text-orange-500" />
                  Certifications
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-3 p-4 bg-white dark:bg-[#141928] rounded-xl border border-gray-100 dark:border-white/5">
                      <CheckBadgeIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-12">Professional Experience</h3>
              <div className="space-y-8 max-w-3xl mx-auto">
                {experience.map((job, index) => (
                  <div key={job.title} className="relative flex gap-6">
                    {index !== experience.length - 1 && (
                      <div className="absolute left-6 top-14 w-px h-full bg-gradient-to-b from-orange-500/40 to-transparent" />
                    )}
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <BriefcaseIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 bg-white dark:bg-[#0f1422] rounded-2xl p-6 lg:p-8 border border-gray-100 dark:border-white/5 hover:border-orange-500/30 hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-lg font-black text-gray-900 dark:text-white">{job.title}</h4>
                          <p className="text-orange-500 font-semibold">{job.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 self-start sm:self-auto whitespace-nowrap">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full text-sm font-bold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-12">Education & Learning</h3>
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {education.map((edu) => (
                  <div key={edu.degree} className="bg-white dark:bg-[#0f1422] rounded-2xl p-6 lg:p-8 border border-gray-100 dark:border-white/5 hover:border-orange-500/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AcademicCapIcon className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1 leading-tight">{edu.degree}</h4>
                        <p className="text-orange-500 font-semibold text-sm mb-1">{edu.institution}</p>
                        <p className="text-gray-400 text-sm mb-2">{edu.year}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Interests ── */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-[#0f1422] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Beyond Coding</h2>
            <p className="text-gray-500 leading-relaxed">What keeps me inspired outside of work</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest) => {
              const Icon = interest.icon;
              return (
                <div key={interest.name} className="bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg hover:border-orange-500/30 hover:shadow-orange-500/5 hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{interest.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{interest.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Let's Work Together</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Ready to bring your ideas to life? Download my CV or get in touch to discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleDownloadCV} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 w-full sm:w-auto justify-center">
                <DocumentArrowDownIcon className="w-5 h-5" />
                Download CV
              </button>
              <a href="/contact" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-500/5 w-full sm:w-auto justify-center">
                <EnvelopeIcon className="w-5 h-5" />
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
