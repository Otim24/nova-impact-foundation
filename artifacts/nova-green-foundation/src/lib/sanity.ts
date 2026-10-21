export type Story = {
  id: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  imageUrl?: string;
  body: string[];
};

export const demoStories: Story[] = [
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
  publishedAt,
  "imageUrl": coverImage.asset->url,
  body[]{style, children[]{text}}
}`;

type SanityStoryResponse = {
  _id?: string;
  title?: string;
  excerpt?: string;
  category?: string;
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
    }));
}
