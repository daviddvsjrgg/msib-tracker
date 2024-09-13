import { ref, set } from 'firebase/database';
import { db } from '@/config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Function to add data to Firebase Realtime Database
export async function addData(userId:string, tableId: string, namaPerusahaan: string): Promise<void> {
  try {
    if (namaPerusahaan.trim() === '') {
      throw new Error('Nama perusahaan cannot be empty');
    }

    // Define the database reference directly
    const rowId = uuidv4() 
    const tableRef = ref(db, `users/${userId}/table/${rowId}`);

    const data = {
      rowId: rowId,
      tableId: tableId,
      mitra_brand_name: namaPerusahaan,
      cycle: "7",
    };

    // Set the data at the specified reference
    await set(tableRef, data);
    console.log('Data added:', { tableId, data });
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
}
