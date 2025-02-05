import fs from 'node:fs';

const content = 'Here is content';
const content1 = 'Some content here';

fs.writeFile('/Users/user/nodejsdemo.txt', content, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('File is created successfully');
    }
});

fs.writeFileSync('/Users/user/nodejsdemosync.txt', content1, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('File is created successfully');
    }
});
