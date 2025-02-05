import axios from 'axios';

let data = null;

async function getPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

getPosts();