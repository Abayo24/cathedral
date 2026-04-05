// sanity/lib/live.ts
import { client } from './client';

// We downgraded next-sanity, so we use standard fetch instead of the Live API
export const sanityFetch = async ({ query, params = {} }: any) => {
  return client.fetch(query, params);
};

// Return an empty component so if <SanityLive /> is imported anywhere, it won't crash
export function SanityLive() {
  return null;
}