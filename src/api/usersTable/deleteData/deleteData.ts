import { ref, remove } from "firebase/database";
import { db } from "@/config/firebase";

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
