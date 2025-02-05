import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';  // Ensure async file reading is used

const PORT = process.env.PORT || 8888;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getBookings = async () => {
    const data = await fs.readFile(path.join(__dirname, 'bookings.json'), 'utf-8');
    return JSON.parse(data);
};

const server = http.createServer(async (req, res) => {
    try {
        if (req.method === 'GET' && req.url === '/bookings') {
            const bookings = await getBookings();  // Await the async function

            console.log('Fetching bookings...');
            console.table(bookings);  // Log the bookings as a table

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(bookings));  // Send the bookings as a response
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method or file is incorrect' }));12
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
