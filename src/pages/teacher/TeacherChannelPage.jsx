import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiUserSettingsLine, RiVideoLine, RiSave3Line,
  RiEyeLine, RiCheckLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Initial mock ended streams that can have their recording prices set
const INITIAL_RECORDINGS = [
  { uuid: "ended-stream-1", title: "Yin Yoga: Deep Joint Opening & Mindfulness", price: "15.00", saved: false },
  { uuid: "ended-stream-2", title: "Chakra Meditation for Inner Balance", price: "", saved: false }
];

export default function TeacherChannelPage() {
  // Channel Profile State
  const [bio, setBio] = useState(
    "Senior Hatha and Vinyasa instructor with over 12 years of teaching experience. Arjun focuses on body alignment, muscular activation, and integrating conscious breathing into daily dynamic flow."
  );
  const [avatarUrl, setAvatarUrl] = useState("");
  const [slug, setSlug] = useState("arjun-mehta");

  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Recordings State
  const [recordings, setRecordings] = useState(INITIAL_RECORDINGS);

  const handleSlugChange = (e) => {
    // Alphanumeric + hyphens only, lowercase
    const formatted = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");
    setSlug(formatted);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSaved(false);

    if (slug.length < 3 || slug.length > 100) {
      setProfileError("Slug length must be between 3 and 100 characters");
      return;
    }
    if (bio.length > 2000) {
      setProfileError("Bio cannot exceed 2000 characters");
      return;
    }

    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePriceChange = (uuid, val) => {
    setRecordings((prev) =>
      prev.map((rec) => (rec.uuid === uuid ? { ...rec, price: val, saved: false } : rec))
    );
  };

  const handleSavePrice = (uuid) => {
    setRecordings((prev) =>
      prev.map((rec) => (rec.uuid === uuid ? { ...rec, saved: true } : rec))
    );
    setTimeout(() => {
      setRecordings((prev) =>
        prev.map((rec) => (rec.uuid === uuid ? { ...rec, saved: false } : rec))
      );
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-2">
            <RiUserSettingsLine /> Channel Settings
          </h1>
          <p className="text-muted-foreground text-xs mt-1">Customize your biography, set custom public URL routes, and set recording prices.</p>
        </div>

        <Link
          to={`/channel/${slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-border hover:bg-background text-foreground font-bold rounded-xl text-xs transition-all shadow-sm shrink-0"
        >
          <RiEyeLine /> View Public Channel
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Edit Bio / Avatar / Slug (66%) */}
        <div className="lg:col-span-2 bg-background border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-foreground">Instructor Bio & Channel Link</h2>
            <p className="text-xs text-muted-foreground mt-1">This information is shown publicly to students browsing classes.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            {profileError && (
              <p className="text-brand text-xs font-semibold">{profileError}</p>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="slug" className="text-foreground font-semibold text-xs">Public Channel Slug (URL link)</Label>
              <div className="flex items-stretch rounded-2xl bg-background/50 border border-border overflow-hidden focus-within:bg-background focus-within:border-stone-450 focus-within:ring-4 focus-within:ring-stone-100/50 transition-all">
                <span className="bg-muted/50 border-r border-border px-4 flex items-center text-sm text-stone-450 font-semibold select-none">
                  navakarana.com/channel/
                </span>
                <Input
                  id="slug"
                  type="text"
                  placeholder="arjun-mehta"
                  value={slug}
                  onChange={handleSlugChange}
                  className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-sm text-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="avatar" className="text-foreground font-semibold text-xs">Profile Photo / Avatar URL</Label>
              <Input
                id="avatar"
                type="url"
                placeholder="https://image.com/myphoto.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="bio" className="text-foreground font-semibold text-xs">Biography</Label>
                <span className="text-[10px] text-muted-foreground font-medium">{bio.length}/2000 chars</span>
              </div>
              <Textarea
                id="bio"
                placeholder="Describe your training methods, qualifications, and class focus..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={2000}
                className="min-h-32 text-sm leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                className="bg-brand hover:bg-brand-light text-white font-bold h-14 px-8 rounded-2xl gap-2 cursor-pointer shadow-md shadow-brand/10 text-base"
              >
                <RiSave3Line /> Save Profile Changes
              </Button>

              {profileSaved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-600 text-xs font-semibold flex items-center gap-1"
                >
                  <RiCheckLine className="size-4" /> Settings updated successfully!
                </motion.span>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Set Recording Prices (33%) */}
        <div className="bg-background border border-border p-6 rounded-3xl shadow-sm space-y-4 h-fit">
          <div>
            <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wider">Set Recording Prices</h3>
            <p className="text-[10px] text-muted-foreground mt-1">Adjust fees for past classes to let students buy replay recordings. Leave blank for free.</p>
          </div>

          <div className="space-y-4 pt-2">
            {recordings.map((rec) => (
              <div key={rec.uuid} className="bg-background border border-border p-3.5 rounded-2xl space-y-3">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-foreground text-[11px] leading-snug truncate">{rec.title}</h4>
                  <span className="text-[9px] text-muted-foreground font-semibold uppercase flex items-center gap-1"><RiVideoLine /> Past Session Recording</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-450 font-bold text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="Free"
                      value={rec.price}
                      onChange={(e) => handlePriceChange(rec.uuid, e.target.value)}
                      className="pl-7 h-11 rounded-xl text-sm"
                    />
                  </div>

                  <Button
                    onClick={() => handleSavePrice(rec.uuid)}
                    className="h-11 px-4 bg-card hover:bg-card rounded-xl text-sm font-semibold cursor-pointer shrink-0"
                  >
                    {rec.saved ? (
                      <span className="text-emerald-400 flex items-center gap-0.5"><RiCheckLine /> Saved</span>
                    ) : (
                      "Set Price"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
