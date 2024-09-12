import { auth, db } from '@/config/firebase'; // Adjust the path based on your configuration
import { signInAnonymously } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export async function authenticateAndSave(): Promise<void> {
    try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.log('No user is signed in. Authenticating anonymously...');
            const userCredential = await signInAnonymously(auth);
            const userId = userCredential.user.uid;
            const tableId = uuidv4();
            const userData = {
                userId,
                tableId,
                username: 'random'
            };
            await set(ref(db, `userData/${userId}`), userData);
            console.log('User authenticated and data saved:', userData);
        } else {
            console.log('User already signed in:', currentUser.uid);
        }
    } catch (error) {
        console.error('Error during authentication or saving data:', error);
    }
}
