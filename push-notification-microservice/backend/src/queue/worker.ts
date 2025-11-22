import { Worker } from 'bullmq';
import redisConfig from '../config/redis';
import { NotificationService } from '../services/notificationService';
import dotenv from 'dotenv';

dotenv.config();

const notificationService = new NotificationService();

const worker = new Worker(
  'notifications',
  async (job) => {
    console.log(`Processing notification job ${job.id}...`);

    const { notificationId } = job.data;

    try {
      const result = await notificationService.sendNotification(notificationId);
      console.log(`Notification ${notificationId} sent: ${result.sent} sent, ${result.failed} failed`);
      return result;
    } catch (error: any) {
      console.error(`Error sending notification ${notificationId}:`, error.message);
      throw error;
    }
  },
  {
    connection: redisConfig,
    concurrency: 5,
  }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

console.log('Worker started and waiting for jobs...');
