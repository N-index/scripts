const procCount = 50;
const uiConfig = Object.fromEntries(
    Array.from({length: procCount}).fill(0).map((v, i) => ['proc_' + i, {x: 0, y: 0}])
);

const uiConfigStr = JSON.stringify(uiConfig);
// console.log(uiConfigStr);

let result1, type1StartTime, type1EndTime;
let result2, type2StartTime, type2EndTime;

// 1. 先 parse 后 toString
(() => {
    type1StartTime = new Date();
    result1 = JSON.stringify(
        Object.entries(JSON.parse(uiConfigStr))
            .reduce(
                (outputConfig, [uid, pos]) => {
                    outputConfig['new_' + uid] = pos;
                    return outputConfig;
                }, {})
    )
    type1EndTime = new Date();
})();

// 2. replace
(() => {
    type2StartTime = new Date();
    result2 = uiConfigStr;
    for (let i = 0; i < procCount; i++) {
        result2 = result2.replace('proc_' + i, 'new_proc_' + i);
    }
    type2EndTime = new Date();
})();

console.log(`处理器个数:${procCount}`);
console.log(`方法1耗时：${(type1EndTime - type1StartTime) / 1000}`);
console.log(`方法2耗时：${(type2EndTime - type2StartTime) / 1000}`);
// console.log(`原始数据：${uiConfigStr}`);
// console.log(`最终结果：${result1}`);
console.log(`两结果是否相等：${result1 === result2}`);
console.log(`两结果是否相等：${typeof result1 === typeof result2}`);
