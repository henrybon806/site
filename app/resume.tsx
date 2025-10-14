import { useEffect } from "react";
import { Redirect } from "expo-router";

export default function ResumeRedirect() {
  // This instantly sends the browser to your resume subdomain
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "https://resume.henrybonomolo.com";
    }
  }, []);

  // Fallback for non-web environments (just skip redirect)
  return <Redirect href="https://resume.henrybonomolo.com" />;
}