const fs = require('fs');
const path = require('path');

const jsonPath = '/Users/rishavchoudhary/Downloads/prepwise-6ecb3-firebase-adminsdk-fbsvc-d2fbc73a27.json';
const envPath = path.join(__dirname, '../.env.local');

try {
    if (!fs.existsSync(jsonPath)) {
        console.error(`Error: JSON file not found at ${jsonPath}`);
        process.exit(1);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // Format the private key: replace actual newlines with literal \n for .env
    const privateKey = serviceAccount.private_key.replace(/\n/g, '\\n');

    const envContent = `
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB4tpHybKjFkDonZHWBj9U3RGg8RAmmNY8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${serviceAccount.project_id}.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${serviceAccount.project_id}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${serviceAccount.project_id}.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=690849937106
NEXT_PUBLIC_FIREBASE_APP_ID=1:690849937106:web:fa822f5f3ec1b2c879df0b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-KV0DCF75L8

FIREBASE_PROJECT_ID=${serviceAccount.project_id}
FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}
FIREBASE_PRIVATE_KEY="${privateKey}"
`;

    fs.writeFileSync(envPath, envContent.trim());
    console.log(`Successfully updated ${envPath} with credentials from JSON file.`);

} catch (error) {
    console.error('Error setting up .env.local:', error);
    process.exit(1);
}
