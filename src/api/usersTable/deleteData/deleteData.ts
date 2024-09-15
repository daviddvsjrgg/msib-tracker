import { ref, remove } from "firebase/database";
import { db } from "@/config/firebase"; // Adjust the path as needed

export const deleteItem = async (rowId: string, userId: string) => {
  try {
    const itemRef = ref(db, `users/${userId}/table/${rowId}`);
    await remove(itemRef); // Remove the item from Firebase
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
