class PowerUp extends Enemy {
    constructor(pos, bounds, power) {
        let attribs = new Attribs(
            { x: 250, y: 170, z: 200 },
            { x: 200, y: 110, z: 150 },
            '8'
        );

        super(
            pos,
            bounds,
            power
        );

        this.texture = 'powerup.svg';

        this.attribs = attribs;

        this.group = 'powerup';
    }
}



