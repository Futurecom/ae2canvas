import Path from '../objects/Path';
import AnimatedPath from '../objects/AnimatedPath';
import Transform from '../transform/Transform';

class BaseLayer {

    constructor(data) {
        this.index = data.index;
        this.in = data.in || 0;
        this.out = data.out;
        if (data.parent) this.parent = data.parent;
        this.transform = new Transform(data.transform);

        if (data.masks) {
            this.masks = data.masks.map(mask => mask.isAnimated ? new AnimatedPath(mask) : new Path(mask));
        }
    }

    draw(ctx, time) {
        ctx.save();

        if (this.parent) this.parent.setParentTransform(ctx, time);
        this.transform.update(ctx, time);

        if (this.masks) {
            ctx.beginPath();
            this.masks.forEach(mask => mask.draw(ctx, time));
            ctx.clip();
        }
    }

    setParentTransform(ctx, time) {
        if (this.parent) this.parent.setParentTransform(ctx, time);
        this.transform.update(ctx, time);
    }

    setKeyframes(time) {
        this.transform.setKeyframes(time);
        if (this.masks) this.masks.forEach(mask => mask.setKeyframes(time));
    }

    reset(reversed) {
        this.transform.reset(reversed);
        if (this.masks) this.masks.forEach(mask => mask.reset(reversed));
    }
}

export default BaseLayer;

























