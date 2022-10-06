import { globalConfig } from '@/config';
const prefix = `${globalConfig.projectName}_${process.env.NODE_ENV}`;

export const tokenKey = `${prefix}_token`;
