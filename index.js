import config from './config.js';
import { checkInstanceHealth } from './monitor.js';

logInitial();

function logInitial() {
  console.log('🚀 AWS EC2 SLA Monitor Started');
  console.log(`Monitoring instances: ${config.monitoredInstances.join(', ')}`);
  console.log(`Region: ${config.region}`);
  console.log(`Interval: ${config.checkInterval / 60000} minutes`);
  console.log('--------------------------------------------');
}

setInterval(checkInstanceHealth, config.checkInterval);
checkInstanceHealth(); // Run immediately on startup
