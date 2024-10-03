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
    } else {
      // Otherwise, update the data
      await set(dbRef, option);

      updateUpdatedAtTable(userId, rowId)
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

    updateUpdatedAtTable(userId, rowId)

  } catch (error) {
    console.error("Error updating Firebase:", error);
  }
};

// Edit Row Progress Name Change
export const updateInputRowProgressName = async (value: string, rowId: string, userId: string, progressId: string, column: string) => {
  try {
    const dbRef = ref(db, `users/${userId}/table/${rowId}/progress/${progressId}/${column}`);
    await set(dbRef, value);

    updateUpdatedAtTable(userId, rowId)

  } catch (error) {
    console.error("Error updating Firebase:", error);
  }
};

// Edit Row Progress Desc Change
export const updateInputRowProgressDesc = async (value: string, rowId: string, userId: string, progressId: string, column: string) => {
  try {
    const dbRef = ref(db, `users/${userId}/table/${rowId}/progress/${progressId}/${column}`);
    await set(dbRef, value);

    updateUpdatedAtTable(userId, rowId)

  } catch (error) {
    console.error("Error updating Firebase:", error);
  }
};

export const updateUpdatedAtTable = async (userId: string, rowId: string) => {
  try {

    const dbRefTimeUpdated = ref(db, `users/${userId}/table/${rowId}/updatedAt`);
    await set(dbRefTimeUpdated, new Date().toISOString());

  } catch (error) {
    console.error("Error updating Firebase:", error);
  }
};
