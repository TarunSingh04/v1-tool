import { create } from 'zustand';

const reportPdfDisplayStore = create((set) => ({
  reportPdfDisplayName: "", 
  setreportPdfDisplayName: (value) => set({ reportPdfDisplayName: value }), // Fixed typo here
}));

export default reportPdfDisplayStore;
