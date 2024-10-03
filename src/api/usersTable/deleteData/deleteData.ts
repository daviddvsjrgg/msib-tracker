import { ref, remove } from "firebase/database";
import { db } from "@/config/firebase";
import { updateUpdatedAtTable } from "../editData/editData";

export const deleteItem = async (rowId: string, userId: string) => {
  try {
    const itemRef = ref(db, `users/${userId}/table/${rowId}`);
    await remove(itemRef);
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const deleteProgress = async (userId: string, rowId: string, progressId: string) => {
  try {
    const itemRef = ref(db, `users/${userId}/table/${rowId}/progress/${progressId}`);
    await remove(itemRef);

    updateUpdatedAtTable(userId, rowId)

    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
