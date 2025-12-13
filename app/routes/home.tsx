import { useEffect } from "react";
import { useNavigate } from "react-router";
import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";

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
  const {
    isLoading,
    puterReady,
    auth: { isAuthenticated },
  } = usePuterStore();

  const navigate = useNavigate();

  useEffect(() => {
    // 🔒 Wait until Puter finishes initializing
    if (!puterReady || isLoading) return;

    if (!isAuthenticated) {
      navigate("/auth?next=/", { replace: true });
    }
  }, [puterReady, isLoading, isAuthenticated, navigate]);

  // Prevent UI flash
  if (!puterReady || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // redirect will happen
  }

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

        <div className="resume-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      </section>
    </main>
  );
}
