import { db } from '@/config/firebase';
import { ref, set, get, remove } from 'firebase/database';

// Edit Option Change
export const updateOption = async (option: string, userId: string, rowId: string, column: string): Promise<void> => {
  try {
    if (!option || !userId || !rowId || !column) {
      throw new Error('Invalid');
    }
    
    const dbRef = ref(db, `users/${userId}/table/${rowId}/${column}`);

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
    console.error('Error saving data:', error);
  }
};

// Edit Input Change
export const updateInput = async (value: string, userId: string, rowId: string, column: string) => {
    try {
      const dbRef = ref(db, `users/${userId}/table/${rowId}/${column}`);
      await set(dbRef, value);
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating Firebase:", error);
    }
  };
