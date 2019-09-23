require('dotenv').config();

const req = process.env.SOCKS_HOST ? {
  agentClass: require('socks5-https-client/lib/Agent'),
  agentOptions: {
    socksHost: process.env.SOCKS_HOST,
    socksPort: process.env.SOCKS_PORT,
    socksUsername: process.env.SOCKS_USERNAME,
    socksPassword: process.env.SOCKS_PASSWORD,
  },
} : undefined;

require('./web')(require('./bot')(process.env.TOKEN, true, req));
