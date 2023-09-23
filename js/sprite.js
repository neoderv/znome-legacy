class Sprite extends Shape {
    constructor(cat, p, pos, scale, attribs, bounds, texture) {
        super(cat, p);
        this.parent = document.querySelector('#canvas');
        this.pos = pos;
        this.scale = scale;
        this.attribs = attribs;
        this.delete = false;
        this.bounds = bounds;
        this.texture = texture;
    }
    reload(unload) {
        if (this.elem) {
            this.elem.remove();
        }

        if (!unload) {
            let shapeRender = this.render();
            this.elem = shapeRender;
            this.parent.appendChild(shapeRender);
        } else {
            this.delete = true;
        }
    }
    transform() {

        if (!this.elem)
            this.reload();

        this.elem.setAttribute('transform', `translate(${this.pos.x}, ${this.pos.y}) scale(${this.scale.x / 100}, ${this.scale.y / 100})`);

        let compiled = this.attribs.out;

        for (let attrib in compiled) {
            this.elem.setAttribute(attrib, compiled[attrib]);
        }
    }


    fancy() {
        this.isFancy = true;
        this.cat = 'image';
        this.p = `img/${this.texture}`;
        this.reload();
        this.transform();
    }
}


