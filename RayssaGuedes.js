const red = '#b53c1e';
const darkRed = '#a22719';
const gray = '#aaac9f';
const black = '#1b1b1d';
const bg = '#EAE0C9';

const big = 120;
const mid = 86;
const small = 60;

const margin = 4;
const gap1 = 27;
const gap2 = 10;
const gap3 = 10;

const y1 = 92;
const y2 = 212;
const y3 = 302;
const hoverScale = 1.06;

function setup() {
	createCanvas(400, 400);
	loop();
}

function draw() {
	background(bg);
	noStroke();

	const row1 = rowLayout([big, big, big / 2], gap1);
	const row2 = rowLayout([mid / 2, mid, mid / 2, mid, mid], gap2);
	const row3 = rowLayout([small, small, small, small, small, small / 2], gap3);

	circleAt(row1[0], y1, big, red);
	circleAt(row1[1], y1, big, darkRed);
	halfAt(row1[2], y1, big, gray, 'right');

	halfAt(row2[0], y2, mid, gray, 'right');
	circleAt(row2[1], y2, mid, gray);
	halfAt(row2[2], y2, mid, gray, 'right');
	circleAt(row2[3], y2, mid, gray);
	splitAt(row2[4], y2, mid, red, darkRed);

	circleAt(row3[0], y3, small, darkRed);
	circleAt(row3[1], y3, small, red);
	circleAt(row3[2], y3, small, black);
	circleAt(row3[3], y3, small, black);
	circleAt(row3[4], y3, small, black);
	halfAt(row3[5], y3, small, black, 'left');
}

function rowLayout(widths, gap) {
	const total = widths.reduce((s, w) => s + w, 0) + gap * (widths.length - 1);
	let x = margin + (width - margin * 2 - total) / 2;
	const list = [];

	for (let i = 0; i < widths.length; i += 1) {
		list.push(x);
		x += widths[i] + gap;
	}

	return list;
}

function circleAt(x, y, d, c) {
	const cx = x + d / 2;
	const s = isHoverCircle(cx, y, d) ? hoverScale : 1;
	fill(c);
	ellipse(cx, y, d * s, d * s);
}

function splitAt(x, y, d, c1, c2) {
	const cx = x + d / 2;
	const s = isHoverCircle(cx, y, d) ? hoverScale : 1;
	fill(c1);
	arc(cx, y, d * s, d * s, HALF_PI, 3 * HALF_PI, CHORD);
	fill(c2);
	arc(cx, y, d * s, d * s, -HALF_PI, HALF_PI, CHORD);
}

function halfAt(x, y, d, c, side) {
	fill(c);
	if (side === 'left') {
		const cx = x + d / 2;
		const s = isHoverHalf(cx, y, d, 'left') ? hoverScale : 1;
		arc(cx, y, d * s, d * s, HALF_PI, HALF_PI + PI, CHORD);
	} else {
		const cx = x;
		const s = isHoverHalf(cx, y, d, 'right') ? hoverScale : 1;
		arc(cx, y, d * s, d * s, -HALF_PI, HALF_PI, CHORD);
	}
}

function isHoverCircle(cx, cy, d) {
	return dist(mouseX, mouseY, cx, cy) <= d / 2;
}

function isHoverHalf(cx, cy, d, side) {
	const inside = dist(mouseX, mouseY, cx, cy) <= d / 2;
	if (!inside) {
		return false;
	}
	return side === 'left' ? mouseX <= cx : mouseX >= cx;
}
