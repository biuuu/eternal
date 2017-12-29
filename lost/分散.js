var t1 = param.p.time;   // param.p.time 取到输入框里的“间隔时间”
var t2 = 0.3;       // 渐显的动作时间
var t3 = 0.3;       // 消失的动作时间
var d = param.d;

// func.getPosX 可以根据字符串（text）和给定的间隔距离（spacing）计算每个字的X坐标，返回值为一个数组，如 [450, 475, 500, 525, 550]
// 传入 anchor 参数可以改变锚点，不传默认为4，就是中中锚点
// 传入 px 参数可以改变X的相对坐标，默认为500，就是正中
var i1 = func.getPosX({
    text: d.text,       // d.text 即 param.d.text，当前这条lrc的文本内容
    spacing: 25
});
var i2 = func.getPosX({
    text: d.text,
    spacing: 50
});

var n = param.i;        // param.i 当前这个字在这句歌词里的位置，从0开始

// 计算每个弹幕的坐标偏移
var l = i2[n] - i1[n];
var speed = l / param.d.lifeTime;
var x1 = i1[n] + n * t1 * speed;    // 初始坐标，根据出现时间的间隔添加偏移
var x2 = x1 + t2 * speed;       // 渐现动作的结束坐标
var x3 = x2 + (param.d.lifeTime - t2 - t3) * speed;     // 持续时间内的结束坐标
var x4 = x3 + t3 * speed;       // 渐隐动作的结束坐标

action.list = [
    {
        l: 0,
        x: x1,
        t: 0
    },
    {
        l: t2,
        x: x2,
        t: 1
    },
    {
        l: param.d.lifeTime - t2 - t3,
        x: x3
    },
    {
        l: t3,
        x: x4,
        t: 0
    }

];
