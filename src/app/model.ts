export class Player {
    constructor(
        public name: string,
        public color: string
    ) {}
}

export class GameEntry {
    constructor(
        public player: Player,
        public text: string
    ) {}
}

export class Settings {
    constructor(
        public showText: boolean,
        public turnTime: number
    ) {}
}
