import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'vq6gtsrw',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'skZ9c3s5p6m4g6d5p4s4m9c3s4m9c3s', // wait, I don't have the token.
  useCdn: false,
});
