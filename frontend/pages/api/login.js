import axios from 'axios';

const { BACKEND_URL } = process.env;

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      const response = await axios.post(`${BACKEND_URL}/user/login`, body);
      return res.json(response.data);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
