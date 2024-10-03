import { auth, db } from '@/config/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

// Function to authenticate user and save data to Realtime Database
export async function authenticateAndSave(): Promise<{ userId: string, tableId: string } | null> {
    try {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                try {
                    if (user) {
                        // If the user is already signed in, log the UID
                        const userId = user.uid;
                        console.log('Your ID:', userId);

                        // Fetch user data from the database
                        const userRef = ref(db, `users/${userId}`);
                        const snapshot = await get(userRef);

                        if (snapshot.exists()) {
                            const userData = snapshot.val();
                            const tableId = userData.tableId;
                            console.log('Your table ID:', tableId);
                            resolve({ userId, tableId }); // Return userId and tableId
                        } else {
                            console.log('No data available for this user.');
                        }
                    } else {
                        // No user is signed in, authenticate anonymously
                        console.log('No user is signed in. Authenticating anonymously...');
                        const userCredential = await signInAnonymously(auth);
                        const userId = userCredential.user.uid;
                        const tableId = uuidv4(); // Generate a unique table ID

                        if (userCredential.user.isAnonymous === true) {
                            // User data to save
                            const userData = {
                                userId,
                                tableId,
                                username: 'anonymous',
                                loginWith: 'anonymous',
                                role: 'anonymous',
                                maxTotalData: 22,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            };

                            // Save user data to Firebase Realtime Database
                            await set(ref(db, `users/${userId}`), userData);
                            console.log('(Anonymous)');

                            const userRef = ref(db, `users/${userId}`);
                            const snapshot = await get(userRef);
                            
                            if (snapshot.exists()) {
                                const userData = snapshot.val();
                                const tableId = userData.tableId;
                                resolve({ userId, tableId }); // Return userId and tableId
                            } else {
                                console.log('No data available for this user. (Anonymous)');
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error during authentication or saving data:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error during authentication or saving data:', error);
        return null;
    }
}
