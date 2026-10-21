export const post = {
  name: "post",
  title: "News story",
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
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
};
