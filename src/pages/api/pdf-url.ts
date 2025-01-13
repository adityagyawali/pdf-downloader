import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../libs/auth';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify the token
    verifyToken(req);

    const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer'
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    return res.send(Buffer.from(response.data));
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}