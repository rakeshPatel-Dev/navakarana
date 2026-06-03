export const MOCK_STREAMS = [
    {
        uuid: "live-stream-1",
        title: "Navakarana Yoga Vinyasa: Strength and Alignment",
        description: "An intensive live session focused on developing core stability, strength, and correct anatomical alignment. Perfect for intermediate practitioners looking to deepen their practice.",
        category: "Vinyasa",
        thumbnail_url: "https://imgs.search.brave.com/e5pFPvFzAcKYhJbVgtHiVvnD1lphlXoQwGjA9Mr43r0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzExLzEzLzI0LzIw/LzM2MF9GXzExMTMy/NDIwODFfMVpLTEQ5/aWp6ZU9sekMzdEFJ/MjNiU1VFMjVYWU1Y/MFIuanBn",
        status: "live",
        is_free: true,
        price: "0.00",
        scheduled_at: new Date(Date.now() - 3600000).toISOString(), // started 1 hour ago
        purchases_count: 42,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
    },
    {
        uuid: "live-stream-2",
        title: "Pranayama & Breathwork Foundation",
        description: "Deep dive into breathwork techniques. Learn how to control energy flow, quiet the mind, and increase vital lung capacity through guided breath sequences.",
        category: "Pranayama",
        thumbnail_url: "https://imgs.search.brave.com/dZ_BbkcZftJbDzPbzvi2w9MzYhIzgu6DClLp2e5SJM4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/MDg4OTE4L3Bob3Rv/L3lvdW5nLXdvbWFu/LXByYWN0aWNpbmct/eW9nYS1pbi11cmJh/bi1sb2Z0LXVwd2Fy/ZC1mYWNpbmctZG9n/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1HRUxUVHdkaDkw/S2ZpQmM2cnRval9U/TnRDSm81SUxlTkxr/WlU2eTBtUTBRPQ",
        status: "live",
        is_free: false,
        price: "15.00",
        scheduled_at: new Date(Date.now() - 1800000).toISOString(), // started 30 mins ago
        purchases_count: 18,
        teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
    },
    {
        uuid: "scheduled-stream-1",
        title: "Hatha Flow for Flexibility & Relaxation",
        description: "A calming Hatha flow session to stretch out muscles, improve range of motion, and release daily accumulated tension.",
        category: "Hatha Flow",
        thumbnail_url: "https://imgs.search.brave.com/GGHzzFUa8TXm7wlFZY7g-nerSoHX8ze1GLzlej-BXcE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NzA3NzkwMC9waG90/by9zZW5pb3Itd29t/YW4tZG9pbmcteW9n/YS1leGVyY2lzZS1h/dC1iZWFjaC1jYWxt/LWFuZC1tZWRpdGF0/aW9uLWNvbmNlcHQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PThzMkdzOE90TGZn/MUZ6N1hlZ1JOb2Vm/THV4REhLdVdIR0pR/MEI1N3hFVGc9",
        status: "scheduled",
        is_free: false,
        price: "12.50",
        scheduled_at: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
        purchases_count: 9,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
    },
    {
        uuid: "scheduled-stream-2",
        title: "Ashtanga Yoga Primary Series Introduction",
        description: "Introduction to the sequence and structure of Ashtanga primary series. Focus on Bandhas, Drishti, and Ujjayi breath.",
        category: "Ashtanga",
        thumbnail_url: "https://imgs.search.brave.com/ebdMgTbWRoy37HrlXJAhrnP1OiBmYd1IQZ3ygMEFOYA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZXZlcnlkYXlo/ZWFsdGguY29tL2lt/YWdlcy9kaWV0LW51/dHJpdGlvbi9oZWFs/dGgtYmVuZWZpdHMt/b2YteW9nYS0wMC03/MjJ4NDA2LmpwZw",
        status: "scheduled",
        is_free: true,
        price: "0.00",
        scheduled_at: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        purchases_count: 132,
        teacher: { uuid: "teacher-david", name: "David Swenson" }
    },
    {
        uuid: "scheduled-stream-3",
        title: "Morning Sun Salutations Intensive",
        description: "Start your day with high energy! 108 rounds of dynamic Sun Salutations to wake up the body and energize your soul.",
        category: "Vinyasa",
        thumbnail_url: "https://imgs.search.brave.com/rKBsDbKArjvD1_WdhPYhQvo0qBJAcU6Tq-UNeVpvgoA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/eW9nYWJhc2ljcy5j/b20veW9nYWJhc2lj/czIwMjUvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDEvYmVn/aW5uZXItbW9ybmlu/Zy15b2dhLTM3NXgy/NTAuanBlZw",
        status: "scheduled",
        is_free: false,
        price: "10.00",
        scheduled_at: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours from now
        purchases_count: 24,
        teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
    },
    {
        uuid: "ended-stream-1",
        title: "Yin Yoga: Deep Joint Opening & Mindfulness",
        description: "Recorded restorative session holding passive poses for longer periods to target connective tissues and cultivate mindfulness.",
        category: "Yin Yoga",
        thumbnail_url: "https://imgs.search.brave.com/XScSDSIY8acZvc297AqWeoWyTUmAp8GwxrgyBhAVwvU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi95b2dh/LW1lZGl0YXRpb24t/Y29uY2VwdC13b21h/bi1zaWxob3VldHRl/LWhlYWx0aHktbWVk/aXRhdGluZy1wb3Nl/LWJhY2stdmlldy1z/dW4tbGlnaHQtcmF5/cy01Njk5NjU4NS5q/cGc",
        status: "ended",
        is_free: false,
        price: "18.00",
        scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        purchases_count: 56,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
    },
    {
        uuid: "ended-stream-2",
        title: "Chakra Meditation for Inner Balance",
        description: "Guidance on focusing energy along the spine, clearing blockages, and aligning the 7 chakras for peace and clarity.",
        category: "Meditation",
        thumbnail_url: "https://imgs.search.brave.com/SAMK9c_fe7YBelt6hDa8WEGjfBEUskqS3iwUuy7ti48/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8x/Mi8zMS8xNi8wNi95/b2dhLTQ3MzIyMDlf/NjQwLmpwZw",
        status: "ended",
        is_free: true,
        price: "0.00",
        scheduled_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        purchases_count: 245,
        teacher: { uuid: "teacher-david", name: "David Swenson" }
    },
    {
        uuid: "ended-stream-3",
        title: "Core Power Flow Masterclass",
        description: "A fast-paced core strengthening class combining yoga postures with calisthenics elements for high energy burn.",
        category: "Power Yoga",
        thumbnail_url: "https://imgs.search.brave.com/xMfgtevcHgWJtHuUcF8onEiEn9E84Mi0HFNSbRvfShw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ1/OTUzODI3MS9waG90/by95b2dhLWV4ZXJj/aXNlLWFuZC1tZWRp/dGF0aW9uLWF0LXRo/ZS1iZWFjaC13aXRo/LWEtd29tYW4taW4t/cHJheWVyLXBvc2l0/aW9uLWZvci16ZW4t/Y2FsbS1hbmQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUN0/ZHZfT3V0bnJVSDlS/N2xVSEdpZk5mRC1u/QVBaUzJsWWNKTHNn/Zjl0RlE9",
        status: "ended",
        is_free: false,
        price: "20.00",
        scheduled_at: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
        purchases_count: 89,
        teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
    }
];

export const STREAMS_DB = {
    "live-stream-1": {
        uuid: "live-stream-1",
        title: "Navakarana Yoga Vinyasa: Strength and Alignment",
        description: "An intensive live session focused on developing core stability, strength, and correct anatomical alignment. Perfect for intermediate practitioners looking to deepen their practice.\n\nIn this session, we will flow through an alignment-based practice focusing on activating the deep core, pelvic floor stabilizers, and upper body support. You will receive real-time cues, alignment adjustments recommendations, and modifications.",
        category: "Vinyasa",
        thumbnail_url: null,
        status: "live",
        is_free: true,
        price: "0.00",
        scheduled_at: new Date(Date.now() - 3600000).toISOString(),
        purchases_count: 42,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta", slug: "arjun-mehta" }
    },
    "live-stream-2": {
        uuid: "live-stream-2",
        title: "Pranayama & Breathwork Foundation",
        description: "Deep dive into breathwork techniques. Learn how to control energy flow, quiet the mind, and increase vital lung capacity through guided breath sequences.\n\nPranayama is the yogic practice of breath control. In Sanskrit, prana means vital life force, and ayama means to extend or draw out. By learning how to consciously regulate your breathing patterns, you can directly influence your nervous system—calming a hyperactive mind, relieving stress, and bringing physical harmony to the body.",
        category: "Pranayama",
        thumbnail_url: null,
        status: "live",
        is_free: false,
        price: "15.00",
        scheduled_at: new Date(Date.now() - 1800000).toISOString(),
        purchases_count: 18,
        teacher: { uuid: "teacher-sarah", name: "Sarah Connor", slug: "sarah-connor" }
    },
    "scheduled-stream-1": {
        uuid: "scheduled-stream-1",
        title: "Hatha Flow for Flexibility & Relaxation",
        description: "A calming Hatha flow session to stretch out muscles, improve range of motion, and release daily accumulated tension. Slow-paced with static holds and deep stretching.",
        category: "Hatha Flow",
        thumbnail_url: null,
        status: "scheduled",
        is_free: false,
        price: "12.50",
        scheduled_at: new Date(Date.now() + 172800000).toISOString(),
        purchases_count: 9,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta", slug: "arjun-mehta" }
    },
    "scheduled-stream-2": {
        uuid: "scheduled-stream-2",
        title: "Ashtanga Yoga Primary Series Introduction",
        description: "Introduction to the sequence and structure of Ashtanga primary series. Focus on Bandhas, Drishti, and Ujjayi breath. Dynamic, sweaty, and structured.",
        category: "Ashtanga",
        thumbnail_url: null,
        status: "scheduled",
        is_free: true,
        price: "0.00",
        scheduled_at: new Date(Date.now() + 86400000).toISOString(),
        purchases_count: 132,
        teacher: { uuid: "teacher-david", name: "David Swenson", slug: "david-swenson" }
    },
    "ended-stream-1": {
        uuid: "ended-stream-1",
        title: "Yin Yoga: Deep Joint Opening & Mindfulness",
        description: "Recorded restorative session holding passive poses for longer periods to target connective tissues and cultivate mindfulness.\n\nYin yoga is a slow-paced style of yoga as exercise, incorporating principles of traditional Chinese medicine, with asanas that are held for longer periods of time than in other styles.",
        category: "Yin Yoga",
        thumbnail_url: null,
        status: "ended",
        is_free: false,
        price: "18.00",
        recording_price: "15.00",
        recording_url: "https://example.com/recording.mp4",
        scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        purchases_count: 56,
        teacher: { uuid: "teacher-arjun", name: "Arjun Mehta", slug: "arjun-mehta" }
    },
    "ended-stream-2": {
        uuid: "ended-stream-2",
        title: "Chakra Meditation for Inner Balance",
        description: "Guidance on focusing energy along the spine, clearing blockages, and aligning the 7 chakras for peace and clarity.",
        category: "Meditation",
        thumbnail_url: null,
        status: "ended",
        is_free: true,
        price: "0.00",
        recording_price: "0.00",
        recording_url: "https://example.com/recording.mp4",
        scheduled_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        purchases_count: 245,
        teacher: { uuid: "teacher-david", name: "David Swenson", slug: "david-swenson" }
    }
};