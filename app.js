import express from 'express';
import cors from 'cors';
import crypto from 'crypto'

const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://meta-little-lemon-capstone-be.netlify.app' }));

function generateUniqueId(length = 16) {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(length, (err, buffer) => {
			if (err) {
				reject(err);
			} else {
				resolve(buffer.toString('hex'));
			}
		});
	});
}

let formData = [];

app.post('/api/submitAPI', async (req, res) => {
	const { date, time, noOfGuests, occasion } = req.body;
  const uniqueId = await generateUniqueId();

	formData.push({id:uniqueId, date, time, noOfGuests, occasion });

	res.status(200).json(formData);
});

app.get('/api/fetchAPI', (req, res) => {
	res.json(formData);
});

const port = 5500;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
