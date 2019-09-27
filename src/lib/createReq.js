const Agent = require('socks5-https-client/lib/Agent');


module.exports = () => {
  return process.env.SOCKS_HOST && process.env.SOCKS_PORT ? {
    agentClass: Agent,
    agentOptions: {
      socksHost: process.env.SOCKS_HOST,
      socksPort: process.env.SOCKS_PORT,
      socksUsername: process.env.SOCKS_USERNAME,
      socksPassword: process.env.SOCKS_PASSWORD,
    },
  } : undefined;
};
