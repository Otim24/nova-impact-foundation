# Sanity news setup

The website reads published `post` documents from Sanity's public Content Lake
API. It does not need a browser token. Until the project ID and dataset are
configured, the news page uses clearly labelled demo stories.

## Connect a Sanity project

1. Create or choose a Sanity project and a dataset (commonly `production`).
2. Add the `post` schema from `schemaTypes/post.ts` to the Sanity Studio's
   schema types and deploy the Studio.
3. In the website's environment settings, add:
   - `VITE_SANITY_PROJECT_ID` — the project ID shown in Sanity.
   - `VITE_SANITY_DATASET` — the dataset name used by the Studio.
4. In Sanity's API/CORS settings, allow the website's development and published
   origins to read the public dataset.
5. Restart the website and publish a story in Sanity. Published stories will
   replace the demo stories automatically.

The schema supports a title, slug, short summary, category, publication date,
optional cover image and formatted story body. Do not put a Sanity write token
in `VITE_` variables; those are exposed to every site visitor.
