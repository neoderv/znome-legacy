class Enemy extends Sprite {
    constructor(pos, bounds, power) {
        let attribs = new Attribs(
            { x: 250, y: 170, z: 170 },
            { x: 200, y: 110, z: 110 },
            '8'
        );

        super(
            'rect',
            false,
            pos,
            { x: 25, y: 25 },
            attribs,
            bounds,
            'enemy.svg'
        )

        this.dir = Math.random() * Math.PI * 2;
        this.pos = pos;

        this.group = 'enemy';

        this.power = power;
    }
    tick() {
        this.pos.x += Math.cos(this.dir) * this.power / 2;
        this.pos.y += Math.sin(this.dir) * this.power / 2;

        if (this.pos.x < this.bounds.x || this.pos.y < this.bounds.y  || this.pos.x > this.bounds.x2 || this.pos.y > this.bounds.y2 ) { 
            this.reload(true);
            return;
        }

        this.transform();
    }
    interact() {

    }
}



