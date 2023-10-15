// pages/api/getBusiness.js
import getBusinessByUserId from './getBusinessByUserId';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  await getBusinessByUserId(req, res);
}
