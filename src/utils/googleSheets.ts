// Google Sheets submission endpoint
export const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxuAnDX2HdHSvVpDw6M2VsgFpYAp3jvU5c4_uMDczEJ-FvyM-UstV4lwaU-sBHKYPzx/exec';

export interface WaitlistEntry {
  timestamp: string;
  name: string;
  email: string;
  roles: string;
  interests: string;
}

export const submitToGoogleSheets = async (data: Omit<WaitlistEntry, 'timestamp'>) => {
  try {
    const response = await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};
