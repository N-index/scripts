const os = require('os');
const { node, v8 } = process.versions;
const plat = `OS: ${os.type()} ${os.release()} ${os.arch()}\nNode.js: ${node}\nV8: ${v8}`;
const cpus = os.cpus().map(cpu => cpu.model).reduce((o, model) => {
    o[model] = (o[model] || 0) + 1;
    return o;
}, {});
const cpusInfo = Object.keys(cpus).map((key) => {
    return `${key} x ${cpus[key]}`;
}).join('\n');

console.log(`${plat}\nCPU: ${cpusInfo}\nMemory: ${os.totalmem() / (1024 * 1024)} MiB\n`);

// OS: Darwin 20.5.0 x64
// Node.js: 14.17.0
// V8: 8.4.371.23-node.63
// CPU: Intel(R) Core(TM) i9-9880H CPU @ 2.30GHz x 16
// Memory: 32768 MiB
