const dayjs = require(process.argv[2]);
dayjs.locale('pt-BR');            // not loaded: LoadLocale's call when loadLocales.ts lacks the file
console.log('after unloaded pt-BR, dayjs.locale() =', dayjs.locale());
require(process.argv[2] + '/locale/de'); dayjs.locale('de');
console.log('after loaded de, dayjs.locale() =', dayjs.locale());
dayjs.locale('en-US');
console.log('after en-US (react-aria form), dayjs.locale() =', dayjs.locale());
