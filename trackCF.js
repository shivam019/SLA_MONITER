const path = require('path');
const shell = require('shelljs');
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');  
require('dotenv').config();
class AppStatus {
    constructor() {
        this.cfPath = path.join(__dirname, 'linux-amd64', 'cf');
        shell.chmod('+x', this.cfPath);
        this.prisma = new PrismaClient();
    }
    async storeAppLogs(apps) {
        try {
            const db = await cds.connect.to('db');
            const { AppLogs } = db.entities('sap.cf.monitoring');
            console.log("db object", db)
        
            const appLogs = apps.map(app => ({
                ID: cds.utils.uuid(),
                guid: app.guid,
                createdAt: app.created_at,
                updatedAt: app.updated_at,
                name: app.name,
                state: app.state,
                space: app.space,
                mtaId: app.mta_id,
                jobId: app.jobID,
                memoryQuota: app.memoryQuota,
                memoryUsed: app.memoryUsed,
                diskQuota: app.diskQuota,
                diskUsed: app.diskUsed,
                uptime: app.uptime,
                mtaServices: app.mta_services,
                logTimestamp: new Date()
            }));
            await db.run(INSERT.into(AppLogs).entries(appLogs));
            console.log(`Stored ${appLogs.length} app logs successfully`);
            return appLogs;
            const result = await this.prisma.appLogs.createMany({
                data: appLogs
            });
            
            console.log(`Stored ${result.count} app logs successfully`);
        } catch (error) {
            console.error('Error storing app logs:', error);
            throw error;
        }
    }

    //Automatic Deploy SLA moniter to Cloud foundry
    async cfLogin() {
        try {
            console.log("Proceeding to CF LOGIN >>>>>>")
            // CF Configuration
            const envConfig = await this.prisma.envConfig.findFirst({
                where: { isActive: true }
            });
           
            const CF_API = 
            const CF_USER = 
            const CF_PASSWORD = 
            const CF_ORG = 
            const CF_SPACE = 
            const AWS = envConfig?.cfUsername || process.env.CF_USERNAME;
            const AWS_PASS  = envConfig?.cfPassword || process.env.CF_PASSWORD;
            
       
    }

