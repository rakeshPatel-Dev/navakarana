import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiNotification3Line, RiMailSendLine, RiExternalLinkLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const INITIAL_FOLLOWED = [
  {
    uuid: "teacher-arjun",
    name: "Arjun Mehta",
    slug: "arjun-mehta",
    followedSince: "2026-04-12",
    emailEnabled: true
  },
  {
    uuid: "teacher-sarah",
    name: "Sarah Connor",
    slug: "sarah-connor",
    followedSince: "2026-05-18",
    emailEnabled: false
  },
  {
    uuid: "teacher-david",
    name: "David Swenson",
    slug: "david-swenson",
    followedSince: "2026-05-01",
    emailEnabled: true
  }
];

export default function NotificationsPage() {
  const [followedTeachers, setFollowedTeachers] = useState(INITIAL_FOLLOWED);

  const handleToggleNotification = (uuid) => {
    setFollowedTeachers((prev) =>
      prev.map((t) =>
        t.uuid === uuid ? { ...t, emailEnabled: !t.emailEnabled } : t
      )
    );
  };

  return (
    <div className="bg-background min-h-screen py-30 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border/60 pb-5">
          <span className="text-brand font-bold text-xs uppercase tracking-widest">My Account</span>
          <h1 className="text-3xl font-extrabold text-foreground mt-1 flex items-center gap-2">
            <RiNotification3Line /> Notification Preferences
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Manage email notifications and alerts for followed teachers.</p>
        </div>

        {/* Info Card */}
        <div className="bg-brand/5 border border-brand/10 p-4 rounded-2xl flex items-start gap-3">
          <RiMailSendLine className="size-5 shrink-0 text-brand mt-0.5" />
          <div className="text-xs text-muted-foreground leading-normal">
            <span className="font-bold text-foreground">Email Notifications:</span> By enabling notifications for a teacher, you will receive automated emails whenever they schedule a new class, update a scheduled stream, or begin broadcasting live.
          </div>
        </div>

        {/* List of Teachers */}
        <div className="bg-background border border-border rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wider mb-2">Followed Channels</h3>

          {followedTeachers.length > 0 ? (
            <div className="divide-y divide-border">
              {followedTeachers.map((teacher, idx) => {
                const initials = teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                return (
                  <motion.div
                    key={teacher.uuid}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      {/* Initials Avatar */}
                      <div className="size-10 bg-muted border border-border rounded-2xl flex items-center justify-center font-bold text-foreground text-sm shrink-0">
                        {initials}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-foreground text-sm">{teacher.name}</span>
                          <Link
                            to={`/channel/${teacher.slug}`}
                            className="text-muted-foreground hover:text-brand transition-colors cursor-pointer"
                          >
                            <RiExternalLinkLine className="size-3.5" />
                          </Link>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Followed since {teacher.followedSince}</p>
                      </div>
                    </div>

                    {/* Styled Toggle Switch */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
                        {teacher.emailEnabled ? "Emails enabled" : "Emails muted"}
                      </span>
                      <button
                        onClick={() => handleToggleNotification(teacher.uuid)}
                        className={`w-11 h-6 rounded-full transition-all relative outline-none cursor-pointer ${teacher.emailEnabled ? "bg-brand" : "bg-muted"
                          }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 bg-background size-5 rounded-full transition-all shadow-sm ${teacher.emailEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              You are not following any channels yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
