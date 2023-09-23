class Attribs {
    constructor(fill, stroke, width) {
        this.out = {};
        this.in = {};

        this.out['stroke-width'] = width || '2';

        this.color(fill, 'fill');
        this.color(stroke, 'stroke');
    }
    rgb(vec) {
        let arr = [vec.x, vec.y, vec.z];

        let out = `rgb(${arr.join(',')})`;

        return out;
    }
    color(vec, target) {
        this.out[target] = this.rgb(vec);
        this.in[target] = vec;
    }
}


