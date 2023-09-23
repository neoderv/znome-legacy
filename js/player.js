class Player extends Sprite {
    constructor(pos, bounds) {
        let attribs = new Attribs(
            { x: 200, y: 250, z: 170 },
            { x: 160, y: 200, z: 110 },
            '8'
        );

        super(
            'rect',
            false,
            pos,
            { x: 25, y: 25 },
            attribs,
            bounds,
            'player.svg'
        )

        this.pos = pos;

        this.group = 'player';

        this.vel = { x: 0, y: 0 };
        this.keys = [];

        this.listen();
    }
    tick() {

        this.pos.x = Math.max(this.pos.x, this.bounds.x + this.scale.x / 2);
        this.pos.x = Math.min(this.pos.x, this.bounds.x2 - this.scale.x / 2);

        this.pos.y = Math.max(this.pos.y, this.bounds.y + this.scale.x / 2);
        this.pos.y = Math.min(this.pos.y, this.bounds.y2 - this.scale.x / 2);

        this.vel.y += 0.8 * ((this.keys.s ? 1 : 0) - (this.keys.w ? 1 : 0))
        this.vel.x += 0.8 * ((this.keys.d ? 1 : 0) - (this.keys.a ? 1 : 0))

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.vel.x *= 0.92;
        this.vel.y *= 0.92;

        this.transform();
    }
    listenFunc(e, type) {
        this.keys[e.key] = type;
    }
    listen() {
        if (this.listener)
            window.removeEventListener(this.listener);

        let self = this;

        this.listener = window.addEventListener('keydown', (e) => self.listenFunc(e, true));
        this.listener = window.addEventListener('keyup', (e) => self.listenFunc(e, false));
    }
    interact(entities) {
        for (let entity of entities) {
            let distA = Math.abs(entity.pos.x - this.pos.x) < (entity.scale.x + this.scale.x) / 2;
            let distB = Math.abs(entity.pos.y - this.pos.y) < (entity.scale.y + this.scale.y) / 2;
            if (!distA || !distB) continue;

            if (entity.group == 'enemy') this.lose = true;
            if (entity.group == 'powerup') {
                this.powerup = true;
                entity.delete = true;
                entity.reload(true);
            }
        }
    }
}



