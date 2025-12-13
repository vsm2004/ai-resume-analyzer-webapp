import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
  { title: "HireAnalysis | Auth" },
  {
    name: "description",
    content: "Login to account for accessing HireAnalysis features.",
  },
]);

const Auth = () => {
  const {
    isLoading,
    auth: { isAuthenticated, signIn, signOut },
  } = usePuterStore();

  const location = useLocation();
  const navigate = useNavigate();

  // Extract next URL safely
  const nextParam = new URLSearchParams(location.search).get("next") || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(nextParam);
    }
  }, [isAuthenticated, navigate, nextParam]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Login to continue your journey</h2>
          </div>

          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                Signing you in...
              </button>
            ) : isAuthenticated ? (
              <button className="auth-button" onClick={signOut}>
                Log Out
              </button>
            ) : (
              <button className="auth-button" onClick={signIn}>
                Log In
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
