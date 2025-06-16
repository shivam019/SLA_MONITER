import AWS from 'aws-sdk';
import config from './config.js';
import { logStatus } from './logger.js';
import { sendAlert } from './alert.js';

AWS.config.update({ region: config.region });

const ec2 = new AWS.EC2();

export async function checkInstanceHealth() {
  try {
    const data = await ec2.describeInstanceStatus({
      InstanceIds: config.monitoredInstances,
      IncludeAllInstances: true,
    }).promise();

    for (const instance of data.InstanceStatuses) {
      const instanceId = instance.InstanceId;
      const systemStatus = instance.SystemStatus.Status;
      const instanceStatus = instance.InstanceStatus.Status;

      logStatus(`Instance ${instanceId} | System: ${systemStatus}, Instance: ${instanceStatus}`);

      if (systemStatus !== 'ok' || instanceStatus !== 'ok') {
        await sendAlert(instanceId, `System: ${systemStatus}, Instance: ${instanceStatus}`);
      }
    }

    if (data.InstanceStatuses.length === 0) {
      logStatus('No instance status data available. Check instance ID or region.');
    }
  } catch (error) {
    logStatus(`Error fetching instance health: ${error.message}`);
  }
}
