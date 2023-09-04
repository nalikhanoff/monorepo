import { getSession } from 'next-auth/react';

export default async function (url, options) {
  const session = await getSession();
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.jwt}` }),
    },
  });
}
