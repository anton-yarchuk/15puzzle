const { launchGame } = require('./src/core');
const Console = require('./src/io/conosle');

// Anon. function since we don't have https://github.com/tc39/proposal-top-level-await yet
(async () => {
  await launchGame({ input: Console, output: Console });
})();
