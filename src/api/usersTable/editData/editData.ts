import { db } from '@/config/firebase';
import { ref, set, get, remove } from 'firebase/database';

// Function to update or delete the selected option in Firebase Realtime Database
export const updateOption = async (option: string, userId: string, rowId: string, column: string): Promise<void> => {
  try {
    if (!option || !userId || !rowId) {
      throw new Error('Invalid');  // Throw error if inputs are invalid
    }
    
    const dbRef = ref(db, `users/${userId}/table/${rowId}/${column}`);  // Reference path using userId

    // Get the current value from the database
    const snapshot = await get(dbRef);
    const currentValue = snapshot.val();

    if (currentValue === option) {
      // If the new option is the same as the current value, delete the data
      await remove(dbRef);
      console.log('Data removed successfully');
    } else {
      // Otherwise, update the data
      await set(dbRef, option);
      console.log('Data saved successfully');
    }
  } catch (error) {
    console.error('Error saving data:', error);  // Catch and log any errors
  }
};

// Edit Brand Name
// Function to update Firebase
export const updateBrandName = async (value: string, userId: string, rowId: string) => {
    try {
      const dbRef = ref(db, `users/${userId}/table/${rowId}/mitra_brand_name`); // Adjust to your Firebase path
      await set(dbRef, value);
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating Firebase:", error);
    }
  };
