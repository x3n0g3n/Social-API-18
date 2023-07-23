// initialize variables
const usernames = [
    'LunarFlora',
    'StellarLens',
    'CyberBloom',
    'GalaxyShutter',
    'SolarLeaf',
    'PixelBotanist',
    'AstroFern',
    'CosmicCapture',
    'TechBlossom',
    'StarGazer',
    'BotanicalByte',
    'NebulaSnap',
    'DigitalFlower',
    'CelestialFocus',
    'TechLens',
    'LandscapePixel',
    'EcoAstro',
    'SolarPixel',
    'TechShutter',
    'NatureExplorer'
  ],
  emails = [
    'dog@example.com',
    'cat@example.com',
    'rabbit@example.com',
    'tiger@example.com',
    'elephant@example.com',
    'otter@example.com',
    'giraffe@example.com',
    'lynx@example.com',
    'bobcat@example.com',
    'narwhal@example.com',
    'whale@example.com',
    'lion@example.com',
    'bear@example.com',
    'wolf@example.com',
    'hedgehog@example.com',
    'bird@example.com',
    'snake@example.com',
    'kangaroo@example.com',
    'zebra@example.com',
    'monkey@example.com'
    ];
    
    // map the users array, and create an object with the username and email (based on the username index)
    const usersArr = usernames.map((username, index) => ({
      username: username,
      email: emails[index]
    }));
    
  // export the data for seed.js
  module.exports = { usersArr };
    