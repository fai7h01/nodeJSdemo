
import http from 'http';
import path from 'path';
import url from 'url';
import fs from 'fs/promises';
const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getBookings = async () => {
    const data = await fs.readFile(path.join(__dirname, 'bookings.json'), 'utf-8');
    return JSON.parse(data);
}

const saveBooking = async (booking) => {
    await fs.writeFile(path.join(__dirname, 'bookings.json'), 
    JSON.stringify(booking, null, 2), 'utf-8');
}


const server = http.createServer( async (req, res) => {

    const bookings = await getBookings();

    if (req.method === 'GET' && req.url === '/bookings') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(bookings));
    } else if (req.method === 'POST' && req.url === '/save-bookings') {
        let body = ' ';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', async () => {
            const newBooking = JSON.parse(body);
            newBooking.id = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
            bookings.push(newBooking);
            await saveBooking(bookings);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.parse(newBooking));
        })
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end('<h1>Not Found!</h1>');
    }
})

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));