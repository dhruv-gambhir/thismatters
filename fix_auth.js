const fs = require('fs');
const path = require('path');

const files = [
    'app/editprofile/page.js',
    'app/settings/page.js',
    'app/viewprofile/[username]/page.js',
    'app/messages/page.js',
    'app/myprofile/page.js',
    'app/changepassword/page.js',
    'app/newpost/page.js',
    'app/friends/page.js'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if useStore is imported
    if (!content.includes('useStore')) {
        // We need to import useStore. Figure out relative path.
        const depth = file.split('/').length - 2; // app/folder/page.js -> depth 1 -> ../store
        const relativePath = depth === 1 ? '../store' : '../../store';
        
        content = content.replace(/(import.*?;)/, `$1\nimport useStore from "${relativePath}";`);
        if (!content.includes('import useStore')) {
            // fallback
            content = `import useStore from "${relativePath}";\n` + content;
        }
    }
    
    // Check if useRouter is imported
    if (!content.includes('useRouter')) {
        content = content.replace(/(import.*?;)/, `$1\nimport { useRouter } from "next/navigation";`);
    }

    // Check if useEffect is imported
    if (!content.includes('useEffect')) {
        if (content.includes('import { useState')) {
            content = content.replace('import { useState', 'import { useState, useEffect');
        } else {
            content = content.replace(/(import.*?;)/, `$1\nimport { useEffect } from "react";`);
        }
    }

    // Add auth check inside the main component function
    // Find the export default function ...() {
    const match = content.match(/export default function\s+\w+\(.*?\)\s*\{/);
    if (match) {
        const insertPos = match.index + match[0].length;
        
        let insertCode = `\n    const { zIsLoggedIn } = useStore();\n    const router = useRouter();\n\n    useEffect(() => {\n        if (!zIsLoggedIn) {\n            router.push("/login");\n        }\n    }, [zIsLoggedIn, router]);\n\n    if (!zIsLoggedIn) return null;\n`;
        
        // Before inserting, check if zIsLoggedIn already exists
        if (!content.includes('zIsLoggedIn')) {
            content = content.slice(0, insertPos) + insertCode + content.slice(insertPos);
            fs.writeFileSync(file, content);
            console.log("Updated", file);
        } else {
            console.log("Skipped", file, "- already has zIsLoggedIn");
        }
    }
});
