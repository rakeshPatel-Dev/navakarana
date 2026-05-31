import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiUserFollowLine, RiUserUnfollowLine, RiLinkM, RiVideoChatLine, RiBroadcastLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StreamCard from "@/components/shared/StreamCard";

// Mock data database of instructors
const TEACHERS_DB = {
  "arjun-mehta": {
    name: "Arjun Mehta",
    bio: "Senior Hatha and Vinyasa instructor with over 12 years of teaching experience. Arjun focuses on body alignment, muscular activation, and integrating conscious breathing into daily dynamic flow. He believes yoga is a path to physical and spiritual clarity.",
    followers: 1242,
    slug: "arjun-mehta",
    avatar_url: null,
    streams: [
      {
        uuid: "live-stream-1",
        title: "Navakarana Yoga Vinyasa: Strength and Alignment",
        description: "An intensive live session focused on developing core stability, strength, and correct anatomical alignment.",
        category: "Vinyasa",
        thumbnail_url: null,
        status: "live",
        is_free: true,
        price: "0.00",
        scheduled_at: new Date(Date.now() - 3600000).toISOString(),
        purchases_count: 42,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
      },
      {
        uuid: "scheduled-stream-1",
        title: "Hatha Flow for Flexibility & Relaxation",
        description: "A calming Hatha flow session to stretch out muscles, improve range of motion, and release daily accumulated tension.",
        category: "Hatha Flow",
        thumbnail_url: null,
        status: "scheduled",
        is_free: false,
        price: "12.50",
        scheduled_at: new Date(Date.now() + 172800000).toISOString(),
        purchases_count: 9,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
      },
      {
        uuid: "ended-stream-1",
        title: "Yin Yoga: Deep Joint Opening & Mindfulness",
        description: "Recorded restorative session holding passive poses for longer periods to target connective tissues and cultivate mindfulness.",
        category: "Yin Yoga",
        thumbnail_url: null,
        status: "ended",
        is_free: false,
        price: "18.00",
        scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        purchases_count: 56,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
      }
    ]
  },
  "sarah-connor": {
    name: "Sarah Connor",
    bio: "Power Yoga and Pranayama expert. Sarah helps students connect physical power with breath capacity. She teaches dynamic flows that build heat, strength, and resilience.",
    followers: 843,
    slug: "sarah-connor",
    avatar_url: null,
    streams: [
      {
        uuid: "live-stream-2",
        title: "Pranayama & Breathwork Foundation",
        description: "Deep dive into breathwork techniques. Learn how to control energy flow, quiet the mind, and increase vital lung capacity.",
        category: "Pranayama",
        thumbnail_url: null,
        status: "live",
        is_free: false,
        price: "15.00",
        scheduled_at: new Date(Date.now() - 1800000).toISOString(),
        purchases_count: 18,
        teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
      },
      {
        uuid: "scheduled-stream-3",
        title: "Morning Sun Salutations Intensive",
        description: "Start your day with high energy! 108 rounds of dynamic Sun Salutations to wake up the body and energize your soul.",
        category: "Vinyasa",
        thumbnail_url: null,
        status: "scheduled",
        is_free: false,
        price: "10.00",
        scheduled_at: new Date(Date.now() + 3600000 * 5).toISOString(),
        purchases_count: 24,
        teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
      },
      {
        uuid: "ended-stream-3",
        title: "Core Power Flow Masterclass",
        description: "A fast-paced core strengthening class combining yoga postures with calisthenics elements.",
        category: "Power Yoga",
        thumbnail_url: null,
        status: "ended",
        is_free: false,
        price: "20.00",
        scheduled_at: new Date(Date.now() - 86400000 * 10).toISOString(),
        purchases_count: 89,
        teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
      }
    ]
  }
};

export default function ChannelPage() {
  const { slug } = useParams();
  
  // Try to find teacher or use Arjun Mehta as default
  const teacher = TEACHERS_DB[slug] || TEACHERS_DB["arjun-mehta"];
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(teacher.followers);
  const [copied, setCopied] = useState(false);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((c) => c - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((c) => c + 1);
    }
  };

  const handleCopySlug = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = useMemo(() => {
    return teacher.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [teacher.name]);

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner Hero Area */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-brand-dark rounded-4xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand/10 blob-shape pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 z-10 relative">
            {/* Avatar */}
            <div className="size-24 bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center font-bold text-3xl rounded-3xl shrink-0 shadow-md">
              {initials}
            </div>

            {/* Teacher Details */}
            <div className="text-center md:text-left space-y-3 flex-1">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight">{teacher.name}</h1>
                <Badge className="bg-brand hover:bg-brand-light text-white border-transparent px-2.5 py-0.5 rounded-md font-semibold text-xs gap-1">
                  <RiBroadcastLine /> Certified Teacher
                </Badge>
              </div>

              {/* Slug Info */}
              <button 
                onClick={handleCopySlug}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-xs font-semibold bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-all cursor-pointer border border-white/5"
              >
                <RiLinkM className="size-3.5" />
                channel/{teacher.slug}
                {copied && <span className="text-emerald-400 ml-1">Copied!</span>}
              </button>

              <p className="text-stone-300 text-sm max-w-2xl font-normal leading-relaxed">
                {teacher.bio}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                <div>
                  <span className="text-xl font-black text-white">{followerCount}</span>
                  <span className="text-stone-400 text-xs font-medium ml-1">followers</span>
                </div>
                <div className="h-4 w-px bg-stone-750" />
                <div>
                  <span className="text-xl font-black text-white">{teacher.streams.length}</span>
                  <span className="text-stone-400 text-xs font-medium ml-1">classes</span>
                </div>
              </div>
            </div>

            {/* Follow Actions */}
            <div className="shrink-0 flex items-center gap-2 pt-4 md:pt-0">
              <Button
                onClick={handleFollowToggle}
                className={`px-6 h-11 font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                  isFollowing
                    ? "bg-white text-stone-900 hover:bg-stone-100"
                    : "bg-brand hover:bg-brand-light text-white shadow-brand/20"
                }`}
              >
                {isFollowing ? (
                  <>
                    <RiUserUnfollowLine /> Unfollow
                  </>
                ) : (
                  <>
                    <RiUserFollowLine /> Follow Channel
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div className="space-y-6">
          <div className="border-b border-stone-200/60 pb-4">
            <h2 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
              <RiVideoChatLine className="text-brand size-5" /> Active & Upcoming Sessions
            </h2>
            <p className="text-xs text-stone-500 mt-1">Browse all stream transmissions and recordings hosted on this channel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacher.streams.map((stream) => (
              <motion.div
                key={stream.uuid}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <StreamCard stream={{...stream, teacher: { uuid: "teacher-uuid", name: teacher.name }}} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
