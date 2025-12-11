import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { resume } from "react-dom/server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireAnalysis" },
    {
      name: "description",
      content: "Get an AI-based suggestions and analysis of your resume!!",
    },
  ];
}

export default function Home() {
  const resumesList = Array.isArray(resumes) ? resumes : [];

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your resume applications with AI-powered insights</h1>
          <h2>
            Review your resume and get personalized suggestions to improve your
            chances of landing your dream job.
          </h2>
        </div>
        {resume.length > 0 &&(
        <div className="resume-section">
          {resumesList.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
      </div>

      )}
      </section>
    </main>
  );
}
