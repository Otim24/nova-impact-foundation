export const post = {
  name: "post",
  title: "Media Hub post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Short summary",
      type: "text",
      rows: 3,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Field notes", value: "Field notes" },
          { title: "Community voices", value: "Community voices" },
          { title: "Programme update", value: "Programme update" },
          { title: "Partnerships", value: "Partnerships" },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "mediaType",
      title: "Media type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Video", value: "video" },
          { title: "Photo", value: "photo" },
          { title: "Podcast", value: "podcast" },
        ],
      },
      initialValue: "article",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "duration",
      title: "Duration (videos & podcasts)",
      type: "string",
      description: "e.g. 4:32 or 22:10",
      hidden: ({ parent }: { parent?: { mediaType?: string } }) =>
        parent?.mediaType !== "video" && parent?.mediaType !== "podcast",
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or Vimeo link",
      hidden: ({ parent }: { parent?: { mediaType?: string } }) =>
        parent?.mediaType !== "video",
    },
    {
      name: "audioUrl",
      title: "Audio URL",
      type: "url",
      description: "Podcast audio link or embed URL",
      hidden: ({ parent }: { parent?: { mediaType?: string } }) =>
        parent?.mediaType !== "podcast",
    },
    {
      name: "photoCount",
      title: "Number of photos",
      type: "number",
      description: "How many images in this gallery",
      hidden: ({ parent }: { parent?: { mediaType?: string } }) =>
        parent?.mediaType !== "photo",
    },
    {
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "body",
      title: "Story",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "mediaType", media: "coverImage" },
  },
};
