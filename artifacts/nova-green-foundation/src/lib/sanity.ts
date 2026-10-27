export type MediaType = 'video' | 'photo' | 'podcast' | 'article';

export type Story = {
  id: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  imageUrl?: string;
  body: string[];
  mediaType: MediaType;
  duration?: string;       // for videos and podcasts
  videoUrl?: string;       // for video embeds
  audioUrl?: string;       // for podcast embeds
  photoCount?: number;     // for photo galleries
};

/* ─── Demo content for the Media Hub ─── */

export const demoStories: Story[] = [
  // ── ARTICLES (News & Updates) ──
  {
    id: "demo-community-garden",
    category: "FIELD NOTES",
    date: "18 June 2024",
    title: "A new season of learning in the community garden",
    summary:
      "In a growing number of communities, farmer learning groups are sharing small, practical ways to keep soil healthy and harvests resilient.",
    body: [
      "Across local farmer learning groups, neighbours are sharing practical ways to care for soil, save water and plan for changing seasons.",
      "The work starts with what people already know. Together, farmers test small changes, compare results and decide what makes sense for their land and livelihoods.",
    ],
    imageUrl: "/images/uganda-farmers.jpg",
    mediaType: "article",
  },
  {
    id: "demo-young-makers",
    category: "COMMUNITY VOICES",
    date: "02 May 2024",
    title: "Young makers see new value in what we throw away",
    summary:
      "A look at the early ideas and local skills behind circular enterprise—and why a supportive network matters.",
    body: [
      "Young entrepreneurs are exploring how materials often treated as waste can become useful products and new sources of income.",
      "Skills, mentoring and connections to local markets can help promising ideas grow into viable enterprises that benefit the wider community.",
    ],
    mediaType: "article",
  },
  {
    id: "demo-clean-energy",
    category: "PROGRAMME UPDATE",
    date: "14 March 2024",
    title: "Bringing clean energy conversations closer to home",
    summary:
      "Community dialogue is helping families and small businesses explore energy choices that fit their needs.",
    body: [
      "Reliable energy can support household wellbeing, learning and small businesses. Local conversations help make options easier to understand.",
      "Community members are sharing their priorities and questions so future solutions can respond to everyday needs.",
    ],
    mediaType: "article",
  },
  {
    id: "demo-climate-plan",
    category: "PARTNERSHIPS",
    date: "29 January 2024",
    title: "Working together for a more inclusive climate plan",
    summary:
      "Local voices are helping shape priorities for a future that can meet the needs of every generation.",
    body: [
      "A climate plan is stronger when it reflects the experience of the people most affected by change.",
      "Community groups, local institutions and partners can build a shared direction through open dialogue and clear commitments.",
    ],
    mediaType: "article",
  },

  // ── VIDEOS ──
  {
    id: "demo-video-farming-workshop",
    category: "FIELD NOTES",
    date: "10 September 2024",
    title: "Inside a climate-smart farming workshop",
    summary:
      "Watch community members demonstrate soil conservation techniques passed between generations and adapted for a changing climate.",
    body: [
      "This short film follows a two-day training event where experienced farmers in Gulu district share soil conservation methods.",
      "Participants learn how mulching, contour ploughing and companion planting can protect yields as weather patterns shift.",
    ],
    mediaType: "video",
    duration: "4:32",
    videoUrl: "https://www.youtube.com/watch?v=example",
  },
  {
    id: "demo-video-solar-install",
    category: "PROGRAMME UPDATE",
    date: "22 July 2024",
    title: "Community solar: light for a local health centre",
    summary:
      "A solar micro-grid brings reliable electricity to a rural health facility—watch the story of the installation and the people behind it.",
    body: [
      "When a health centre in Lira district received a solar micro-grid, it marked the start of reliable lighting for night-time emergencies.",
      "Community technicians trained during the project will maintain the system, building local capacity alongside clean energy access.",
    ],
    mediaType: "video",
    duration: "6:15",
    videoUrl: "https://www.youtube.com/watch?v=example2",
  },
  {
    id: "demo-video-youth-enterprise",
    category: "COMMUNITY VOICES",
    date: "05 April 2024",
    title: "From waste to craft: young entrepreneurs tell their story",
    summary:
      "Three young makers explain how turning discarded plastics into furniture opened a path to dignified work and community respect.",
    body: [
      "In Kampala's Bwaise neighbourhood, a small workshop is turning discarded plastics into sturdy, affordable furniture.",
      "The founders share what they have learned about markets, mentorship and the everyday challenges of building a circular enterprise.",
    ],
    mediaType: "video",
    duration: "8:47",
    videoUrl: "https://www.youtube.com/watch?v=example3",
  },

  // ── PHOTOS ──
  {
    id: "demo-photo-harvest",
    category: "FIELD NOTES",
    date: "28 August 2024",
    title: "Harvest day across three districts",
    summary:
      "A photo series documenting the season's first harvest from climate-smart farming plots in northern Uganda.",
    body: [
      "Photographers followed farmers across three districts as they gathered the results of months of careful, climate-adapted work.",
      "These images capture the people, routines and landscapes that define harvest season in communities building resilient livelihoods.",
    ],
    imageUrl: "/images/uganda-farmers.jpg",
    mediaType: "photo",
    photoCount: 24,
  },
  {
    id: "demo-photo-workshop",
    category: "PROGRAMME UPDATE",
    date: "15 June 2024",
    title: "Faces from the women's enterprise training",
    summary:
      "Portraits and candid moments from a week-long business skills programme for women leading circular enterprises.",
    body: [
      "Thirty-two women from across the region came together for practical training in product design, costing and market access.",
      "These photographs capture the energy, focus and connection that made the programme a turning point for many participants.",
    ],
    mediaType: "photo",
    photoCount: 18,
  },
  {
    id: "demo-photo-community-dialogue",
    category: "PARTNERSHIPS",
    date: "02 February 2024",
    title: "Planning together: community dialogue in pictures",
    summary:
      "Documentary photography from a series of community planning sessions where local priorities shaped climate adaptation plans.",
    body: [
      "Over two weeks, community members, local leaders and technical advisors gathered under trees, in school halls and around kitchen tables.",
      "These images record the conversations, the disagreements and the shared decisions that form the foundation of locally-led climate planning.",
    ],
    mediaType: "photo",
    photoCount: 31,
  },

  // ── PODCASTS ──
  {
    id: "demo-podcast-green-economy",
    category: "COMMUNITY VOICES",
    date: "12 October 2024",
    title: "What does a green economy sound like?",
    summary:
      "Listen to community leaders describe what a fair, green economy means in their own words—and why local ownership matters.",
    body: [
      "In this episode, three community leaders from different districts share their understanding of what a green economy could mean for their families and neighbours.",
      "They discuss land, work, energy and the importance of being heard when big decisions are made about the future.",
    ],
    mediaType: "podcast",
    duration: "22:10",
    audioUrl: "https://example.com/podcast/episode-1",
  },
  {
    id: "demo-podcast-youth-voices",
    category: "COMMUNITY VOICES",
    date: "19 August 2024",
    title: "Next generation: young people on climate and opportunity",
    summary:
      "Young leaders talk about the future they want to build—and the support they need to get there.",
    body: [
      "Four young Ugandans share their perspectives on climate change, livelihoods and what it takes to build meaningful work in their communities.",
      "From agriculture to digital skills, they explain why the transition to a green economy has to include the people who will live with its consequences longest.",
    ],
    mediaType: "podcast",
    duration: "28:45",
    audioUrl: "https://example.com/podcast/episode-2",
  },
  {
    id: "demo-podcast-partnerships",
    category: "PARTNERSHIPS",
    date: "30 May 2024",
    title: "Building trust: how partnerships really work",
    summary:
      "A candid conversation between NOVA team members and community partners about what makes collaboration succeed—or fail.",
    body: [
      "Partnerships are often described in polished language, but the reality involves negotiation, misunderstanding and patient relationship-building.",
      "In this episode, partners on both sides share honest reflections on how they build and maintain trust in complex community-led work.",
    ],
    mediaType: "podcast",
    duration: "34:20",
    audioUrl: "https://example.com/podcast/episode-3",
  },
];

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim();

export const sanityIsConfigured = Boolean(projectId && dataset);

const storiesQuery = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  mediaType,
  duration,
  videoUrl,
  audioUrl,
  photoCount,
  publishedAt,
  "imageUrl": coverImage.asset->url,
  body[]{style, children[]{text}}
}`;

type SanityStoryResponse = {
  _id?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  mediaType?: string;
  duration?: string;
  videoUrl?: string;
  audioUrl?: string;
  photoCount?: number;
  publishedAt?: string;
  imageUrl?: string;
  body?: Array<{ children?: Array<{ text?: string }> }>;
};

export async function fetchSanityStories(signal?: AbortSignal): Promise<Story[]> {
  if (!projectId || !dataset) return [];

  const params = new URLSearchParams({
    query: storiesQuery,
  });
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2021-03-25/data/query/${encodeURIComponent(dataset)}?${params}`,
    { signal, headers: { Accept: "application/json" } },
  );

  if (!response.ok) {
    throw new Error(`Sanity returned ${response.status}`);
  }

  const payload = (await response.json()) as { result?: SanityStoryResponse[] };
  if (!Array.isArray(payload.result)) {
    throw new Error("Sanity returned an unexpected stories response");
  }

  return payload.result
    .filter((story) => story._id && story.title)
    .map((story) => ({
      id: story._id!,
      category: story.category?.trim().toUpperCase() || "NEWS",
      date: story.publishedAt
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date(story.publishedAt))
        : "",
      title: story.title!,
      summary: story.excerpt || "",
      imageUrl: story.imageUrl,
      body:
        story.body
          ?.map((block) =>
            block.children?.map((child) => child.text || "").join(""),
          )
          .filter((text): text is string => Boolean(text?.trim())) || [],
      mediaType: (story.mediaType as MediaType) || "article",
      duration: story.duration,
      videoUrl: story.videoUrl,
      audioUrl: story.audioUrl,
      photoCount: story.photoCount,
    }));
}
