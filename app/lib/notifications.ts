/**
 * Admin Notification Utility
 * Sends alerts to Slack/WhatsApp webhooks for important events
 */

const ADMIN_WEBHOOK_URL = process.env.ADMIN_WEBHOOK_URL;

interface NotificationPayload {
  title: string;
  message: string;
  type: 'order' | 'challenge' | 'support' | 'newsletter';
  data?: any;
}

export const sendAdminNotification = async (payload: NotificationPayload) => {
  if (!ADMIN_WEBHOOK_URL) {
    console.log('Admin notification suppressed: ADMIN_WEBHOOK_URL not set');
    return false;
  }

  try {
    const response = await fetch(ADMIN_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `*${payload.title}*\n${payload.message}\nType: ${payload.type.toUpperCase()}\nTime: ${new Date().toLocaleString()}`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*${payload.title}*\n${payload.message}`
            }
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Type:* ${payload.type} | *Time:* ${new Date().toLocaleString()}`
              }
            ]
          }
        ]
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
};
