class Shape {
    constructor(cat, p) {
        this.cat = cat || 'rect';
        this.p = p || [];
    }
    pathR() {
        switch (this.cat) {
            case 'path':
                let points = this.p
                    .map(arr => arr.join(','))
                    .join('m');

                return `m ${points} Z`;
            case 'circle':
                return `m -50, 0 a 50, 50 0 1,0 100,0 a 50, 50 0 1,0 -100,0`;
            default:
                return `m -50, -50 h 100 v 100 h -100 Z`;
        }
    }
    render() {

        let elem = (this.cat != 'image') ? 'path' : 'image';

        if (this.path) this.path.remove();
        
        this.path = document.createElementNS('http://www.w3.org/2000/svg', elem);

        if (this.cat != 'image') {
            let stringPath = this.pathR();
            this.path.setAttribute('d', stringPath);
        } else {
            this.path.setAttribute('href', this.p);
            this.path.setAttribute('x', -50);
            this.path.setAttribute('y', -50);
        }

        return this.path;
    }
}


