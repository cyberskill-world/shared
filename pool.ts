/* eslint-disable no-console, node/prefer-global/process */
import mongoose from 'mongoose';

const conn = mongoose.createConnection('mongodb://localhost:27017/test', { maxPoolSize: 10 });
const client = conn.getClient();
const topology = client.topology as any;
console.log(Object.keys(client));
console.log(topology);
process.exit(0);
