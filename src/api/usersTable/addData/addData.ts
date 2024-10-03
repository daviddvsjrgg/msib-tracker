import { ref, set, get } from 'firebase/database';
import { db } from '@/config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { updateUpdatedAtTable } from '../editData/editData';

export async function addData(userId: string, namaPerusahaan: string): Promise<void> {
  try {
    if (namaPerusahaan.trim() === '') {
      throw new Error('Nama perusahaan cannot be empty');
    }

    // Define a reference to the user's table data
    const userTableRef = ref(db, `users/${userId}/table`);

    // Fetch the existing data
    const snapshot = await get(userTableRef);

    // Check the number of existing entries
    if (snapshot.exists()) {
      const data = snapshot.val();
      const totalEntries = Object.keys(data).length;

      if (totalEntries >= data.maxTotalData) {
        throw new Error(`Cannot add more data. Limit of ${data.maxTotalData} entries reached.`);
      }
    }

    // Proceed to add new data if under limit
    const rowId = uuidv4();
    const newTableRef = ref(db, `users/${userId}/table/${rowId}`);

    const data = {
      rowId: rowId,
      status: "",
      lokasi: "",
      nama_kegiatan: "",
      deskripsi: "",
      name_ref_kegiatan: "",
      mitra_logo: "",
      mitra_brand_name: namaPerusahaan,
      semester_program: "",
      note: "Link Instagram: https://instagram.com",
      cycle: "8",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Set the data at the specified reference
    await set(newTableRef, data);
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
}

export async function addProgressData(userId: string, rowId: string): Promise<void> {
  try {
    // Proceed to add new data if under limit
    const progressRowId = uuidv4();
    const newTableRef = ref(db, `users/${userId}/table/${rowId}/progress/${progressRowId}`);

    const data = {
      progressId: progressRowId,
      progressName: "Lolos Tahap ?",
      description: "",
      createdAt: new Date().toISOString(),
    };

    updateUpdatedAtTable(userId, rowId)

    // Set the data at the specified reference
    await set(newTableRef, data);
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
}
