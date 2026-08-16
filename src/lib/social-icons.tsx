import type { ReactNode } from "react";
import { Globe } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaReddit,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export function getSocialIcon(platform: string, className = "h-5 w-5"): ReactNode {
  const p = platform.trim().toLowerCase();

  if (p === "linkedin" || p.includes("linkedin")) {
    return <FaLinkedinIn className={className} aria-hidden />;
  }
  if (p === "instagram" || p.includes("instagram") || p === "insta") {
    return <FaInstagram className={className} aria-hidden />;
  }
  if (p === "x" || p === "twitter" || p.includes("twitter") || p.includes("xtwitter")) {
    return <FaXTwitter className={className} aria-hidden />;
  }
  if (p === "facebook" || p === "fb" || p.includes("facebook")) {
    return <FaFacebook className={className} aria-hidden />;
  }
  if (p === "youtube" || p === "yt" || p.includes("youtube")) {
    return <FaYoutube className={className} aria-hidden />;
  }
  if (p === "tiktok" || p.includes("tiktok")) {
    return <FaTiktok className={className} aria-hidden />;
  }
  if (p === "threads" || p.includes("threads")) {
    return <FaThreads className={className} aria-hidden />;
  }
  if (p === "whatsapp" || p.includes("whatsapp")) {
    return <FaWhatsapp className={className} aria-hidden />;
  }
  if (p === "pinterest" || p.includes("pinterest")) {
    return <FaPinterest className={className} aria-hidden />;
  }
  if (p === "reddit" || p.includes("reddit")) {
    return <FaReddit className={className} aria-hidden />;
  }

  // Fallback for unmapped or custom platforms
  return <Globe className={className} aria-hidden />;
}
