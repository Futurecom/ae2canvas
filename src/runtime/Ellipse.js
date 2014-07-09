'use strict';

var Property = require('./Property'),
    AnimatedProperty = require('./AnimatedProperty');

function Ellipse(data) {
    this.name = data.name;
    this.closed = true;

    if (data.size.length > 1) this.size = new AnimatedProperty(data.size);
    else this.size = new Property(data.size);

    if (data.position.length > 1) this.position = new AnimatedProperty(data.position);
    else this.position = new Property(data.position);
}

Ellipse.prototype.draw = function (ctx, time) {

    var size = this.size.getValue(time);
    var position = this.position.getValue(time);

    var x = position[0] - size[0] / 2,
        y = position[1] - size[1] / 2,
        w = size[0],
        h = size[1];

    var ox = (w / 2) * .5522848,
        oy = (h / 2) * .5522848,
        xe = x + w,
        ye = y + h,
        xm = x + w / 2,
        ym = y + h / 2;

    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
};

Ellipse.prototype.reset = function () {
    this.size.reset();
    this.position.reset();
};

module.exports = Ellipse;