export default async function handler(req, res) {
  const { method, query } = req;

  const { url } = query;

  switch (method) {
    case 'GET':
      try {
        const resp = await fetch(url);
        const buff = await resp.blob();
        return res.json({ isSuccess: buff.type.startsWith('image/') });
      } catch (err) {
        return res.json({ isSuccess: false });
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
