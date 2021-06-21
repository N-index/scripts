// https://leetcode-cn.com/problems/binary-watch/
// 这个题我直接看了答案写的。发现了这种遍历的思路...可能用到很多地方。
// 最精髓的应该是 “把数字用二进制表示，直接对应灯泡” 了。

var readBinaryWatch = function(turnedOn) {
    // 只要某个时刻中所亮灯泡的个数总和等于 turnedOn, 便收录。
    const res =[];

    for(let h=0;h<12;h++){

        for(let m=0;m<60;m++){

            // 二进制字符串：当前时间
            const binaryHour = h.toString(2);
            const binaryMin = m.toString(2);

            // 二进制字符串：亮着的位
            const bitCountHour = binaryHour.split("0").join("");
            const bitCountMin = binaryMin.split("0").join("");

            // 亮着的灯泡个数：字符串长度
            const turnedOnHour = bitCountHour.length;
            const turnedOnMin = bitCountMin.length;

            if (turnedOnHour + turnedOnMin === turnedOn) {
                // Hour 不能以0开头, 默认就合适
                const hourString = h;
                // Minute 不满两位时需要补0
                const minuteString = (m < 10 ? "0" : "") + m;

                res.push(hourString + ":" + minuteString);
            }

        }
    }
    return res;
};
