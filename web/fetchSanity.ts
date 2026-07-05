import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'vq6gtsrw',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function run() {
  try {
    const stories = await client.fetch('*[_type == "article"]{title, "slug": slug.current, status, publishDate, category->{name, active, showInNavigation}}');
    console.log(JSON.stringify(stories, null, 2));

    const categories = await client.fetch('*[_type == "category"]{name, active, showInNavigation}');
    console.log("Categories:", JSON.stringify(categories, null, 2));

  } catch (err) {
    console.error(err);
  }
}
run();
