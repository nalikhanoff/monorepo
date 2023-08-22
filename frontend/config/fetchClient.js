import { getSession } from 'next-auth/react';

export default async function (url, options) {
  const session = await getSession();
  console.log(session);
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.jwt}` }),
    },
  });
}
