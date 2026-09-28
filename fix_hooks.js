const fs = require('fs');

const files = [
    'app/changepassword/page.js',
    'app/editprofile/page.js',
    'app/friends/page.js',
    'app/messages/page.js',
    'app/myprofile/page.js',
    'app/newpost/page.js',
    'app/settings/page.js',
    'app/viewprofile/[username]/page.js'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the early return
    content = content.replace(/\s*if \(\!zIsLoggedIn\) return null;\n?/, '');
    
    // Insert it just before the return (
    content = content.replace(/(\n\s*return\s*\()/g, '\n    if (!zIsLoggedIn) return null;\n$1');
    
    fs.writeFileSync(file, content);
    console.log("Fixed hooks in", file);
});
