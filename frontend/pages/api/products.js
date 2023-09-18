import axios from 'axios';
import { getToken } from 'next-auth/jwt';

const { BACKEND_URL } = process.env;

export default async function handler(req, res) {
  const token = await getToken({ req });
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios(`${BACKEND_URL}/products`);
        return res.json(response.data);
      } catch (err) {
        return res.json([]);
      }
    case 'POST':
      if (!token) {
        return res.status(401).json({ isSuccess: false });
      }
      try {
        const response = await axios.post(`${BACKEND_URL}/products`, body, {
          headers: {
            Authorization: `Bearer ${token.jwt}`,
          },
        });
        return res.json({ isSuccess: true, product: response.data });
      } catch (err) {
        return res.json({ isSuccess: false, error: err.response.data.message });
      }
    case 'PUT':
      if (!token) {
        return res.status(401).json({ isSuccess: false });
      }
      try {
        const response = await axios.put(`${BACKEND_URL}/products`, body, {
          headers: {
            Authorization: `Bearer ${token.jwt}`,
          },
        });
        return res.json({ isSuccess: true, product: response.data });
      } catch (err) {
        return res.json({ isSuccess: false, error: err.response.data.message });
      }
    case 'DELETE':
      if (!token) {
        return res.status(401).json({ isSuccess: false });
      }
      const { id } = query;
      try {
        const response = await axios.delete(`${BACKEND_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token.jwt}`,
          },
        });

        return res.json({ isSuccess: true, product: response.data });
      } catch (err) {
        return res.json({ isSuccess: false, error: err.response.data.message });
      }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
