class Init {
    constructor(bounds, tag, mode, token) {
        this.bounds = bounds;
        this.entities = [];

        this.lose = true;
        this.interval = -1;

        this.tag = tag;
        this.mode = mode;

        this.token = token;
    }

    // todo: cleanup

    init() {
        let entities = this.entities;
        let bounds = this.bounds;

        let i = 0;
        let time = 0;

        let high = window.localStorage.getItem(`score-${this.tag}`) || 0;

        let conserveScore = 0;

        this.lose = true;

        let self = this;

        this.interval = window.setInterval(() => {
            document.querySelector('#time').textContent = `score: ${Math.floor(time / 60)}, record: ${Math.floor(high / 60)}`;

            let rect = document.querySelector('#border');

            rect.setAttribute('x', bounds.x)
            rect.setAttribute('y', bounds.y)
            rect.setAttribute('width', bounds.x2 - bounds.x)
            rect.setAttribute('height', bounds.y2 - bounds.y)

            time++;
            i++;

            for (let entityI in entities) {
                let entity = entities[entityI];

                entity.tick();
                entity.interact(entities);
                entity.bounds = bounds;

                if (entity.lose) self.lose = true;
                if (entity.powerup) {
                    entity.powerup = false;
                    time += 300;
                }

                if (!entity.isFancy && self.mode.fancy) entity.fancy();
            }

            if (self.lose || self.stop) {
                for (let entity of entities) {
                    entity.reload(true);
                }
                entities.push(new Player({ x: 25, y: 25 }, bounds))

                high = Math.max(time, high);
                window.localStorage.setItem(`score-${self.tag}`, high);

                time = conserveScore;

                conserveScore = 0;
            }

            if (self.stop) window.clearInterval(self.interval);

            self.lose = false;

            entities = entities.filter(x => !x.delete)

            let tcap = Math.min(time, 1150); // cap difficulty

            let tcap2 = (time > 1150) ? time * 2 - 1150 : time;

            let power = (tcap * 0.01 + 5) / 3;
            let power2 = Math.floor(tcap / 300 + 0.3) + Math.random() - 0.5;

            bounds.x = Math.sin(tcap2 * tcap / 300000) * 400 + 400;
            bounds.y = Math.cos(tcap2 * tcap / 300000) * 100 + 100;

            bounds.x2 = bounds.x + 400;
            bounds.y2 = bounds.y + 400;

            let c = { x: (bounds.x + bounds.x2) / 2, y: (bounds.y + bounds.y2) / 2 };

            if (Math.random() < 0.1 / 200) {
                entities.push(new PowerUp(c, bounds, power))
            }

            if (i > 5) {
                i = 0;
                for (let j = 0; j < power2 / 20 - 0.03; j++) {

                    let enemy = new Enemy(c, bounds, power);
                    entities.push(enemy);

                    let r = Math.random() * 15 + 10

                    enemy.scale.x = r;
                    enemy.scale.y = r;
                }
            }
        }, 1000 / 60)
    }
}
