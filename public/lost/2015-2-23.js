var p = {
	x: 0,
	y: 0
};
var space = 24;		//文字间距
var timeSpace = 0.1;		//出现时间间隔
var timeFadeout = 0.3;		//渐隐时间
var useContainer = true;		//是否使用容器

var color = 0x666666,
	font = 'Microsoft JhengHei',
	size = 25,
	sx = 0.7,
	sy = 0.7;
	
var px = func.getPosX({
	text: param.d.text,
	spacing: space
});

var obj = {
	d: {
		color: color,
		size: size,
		stime: (timeSpace * param.i + param.d.stime).toFixed(3)
	},
	f: {
		f: font,
		l: [[0,1.2,1.2,1]]
	},
	m: {
		n: param.data.m.n,
		e: sx,
		f: sy,
		p: {
			x: px[param.i] - (px[0] - p.x),
			y: p.y
		}
	},
	a: [
		{
			l: 1,
			t: 1
		}, {
			l: param.d.lifeTime - 1
		}
	]
};

if (useContainer) {
	obj.m.parent = param.d.stime;
}
param.r.push(JSON.stringify(func.createSingleDanmaku(obj)));

var pn = param.data['p-' + (param.n + 10)];
if (useContainer) {
	if (!pn) {
		param.data['p-' + (param.n + 10)] = true;
		var obj = {
			m: {
				a: 1,
				n: ' ',
				name: param.d.stime,
				c: 0,
				l: 0,
				p: {
					x: 0,
					y: 0
				}
			},
			d: {
				stime: param.d.stime - 0.01
			},
			a: [
				{
					l: param.d.lifeTime - timeFadeout
				},
				{
					l: timeFadeout,
					t: 0
				}
			]
		};
		param.r.push(JSON.stringify(func.createSingleDanmaku(obj)));
	}
	
}


action.list = null;


