// Rename this file to "settings.js" for it to have effect

const API_ROOT = 'http://127.0.0.1/dcs/';

export default {
  MONITOR_RATELIMIT_ENDPOINTS_URI: `${API_ROOT}/monitor/ratelimit/endpoints`,
  MONITOR_RATELIMIT_PNG_URI: (ratelimit_endpoint) => `${API_ROOT}/monitor/ratelimit/${ratelimit_endpoint}/quota.png`,
  MONITOR_GATHERING_ACTIVITY_URI: `${API_ROOT}/monitor/gathering/activity`,
  MONITOR_GATHERING_DATA_SUMMARY_URI: `${API_ROOT}/monitor/gathering/data/summary`
}