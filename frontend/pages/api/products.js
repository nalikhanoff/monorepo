import axios from 'axios';

const { BACKEND_URL } = process.env;

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios(`${BACKEND_URL}/products`);
        return res.json(response.data);
      } catch (err) {
        console.log(err);
        return res.json([]);
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
