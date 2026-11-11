/**
 * Web3Forms integration helper to send Mitva's activities, wishes, confessions,
 * poll votes, and journal entries to the creator's email.
 */

const WEB3FORMS_ACCESS_KEY = '0e350a32-7cfd-4a5d-b96f-58ece4e35bf6';

export interface Web3FormPayload {
  activity: string;
  dayNumber?: number;
  message?: string;
  details?: Record<string, unknown> | string;
}

export async function sendActivityToWeb3Forms(payload: Web3FormPayload): Promise<boolean> {
  try {
    const formattedDetails =
      typeof payload.details === 'object'
        ? JSON.stringify(payload.details, null, 2)
        : payload.details || '';

    const bodyData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `🌸 Mitva's 11:11 Journey: ${payload.activity}${payload.dayNumber ? ` (Day ${payload.dayNumber})` : ''}`,
      from_name: "Mitva's 11:11 Journey App",
      activity: payload.activity,
      day: payload.dayNumber ? `Day ${payload.dayNumber}` : 'General',
      message: payload.message || 'Activity completed in app',
      details: formattedDetails,
      timestamp: new Date().toLocaleString(),
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error sending activity to Web3Forms:', error);
    return false;
  }
}
