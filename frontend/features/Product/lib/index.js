export async function checkImage(url) {
  const res = await fetch(`/api/check-image?url=${url}`);
  return res.json();
}
