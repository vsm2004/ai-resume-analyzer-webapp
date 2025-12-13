import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function CatchAll() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If pathname contains 'auth', redirect to /auth with query
    if (location.pathname.includes("auth")) {
      const search = location.search || "?next=/";
      navigate("/auth" + search, { replace: true });
    } else {
      // Otherwise, redirect to home
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
}