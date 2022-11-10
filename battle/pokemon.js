class Attack {
    constructor(name, type, element, power, status, statusDuration, mp) {
        this.name = name;
        this.type = type;
        this.element = element;
        this.power = power;
        this.statusEffect = status;
        this.statusDuration = statusDuration;
        this.MPCost = mp;
    }
}

// ==== ATTACKS ====
// basic attacks
let basicAttack = new Attack("normal attack", "direct", "normal", 3, null, 0, 0);
let quickAttack = new Attack("quick attack", "direct", "normal", 4, null, 0, 3);
// element direct attacks
let fireAttack = new Attack("fire", "direct", "fire", 5, null, 0, 5);
let waterAttack = new Attack("water", "direct", "water", 5, null, 0, 5);
let grassAttack = new Attack("grass", "direct", "grass", 5, null, 0, 5);
// element dot attacks
let flameAttack = new Attack("flame", "dot", "fire", 7, "burning", 3, 5);
let bubbleAttack = new Attack("bubble", "dot", "water", 7, "slippery", 3, 5);
let vineAttack = new Attack("vineshot", "dot", "grass", 7, "tangled", 3, 5);

class Pokemon {
    constructor(name, element, attack3, attack4, level, powerLevel) {
        this.name = name;
        this.element = element;
        this.attack1 = basicAttack;
        this.attack2 = quickAttack;
        this.attack3 = attack3;
        this.attack4 = attack4;
        this.level = level;
        this.powerLevel = powerLevel;
        this.status = "healthy";
        this.statusDmg = 0;
        this.statusDuration = 0;
        this.maxHp = 100 + (5 * this.level) * (.2 * this.powerLevel); // TODO: tweak multipliers
        this.currentHp = this.maxHp;
        this.mp = 20 + (2 * this.level); // TODO: tweak multipliers
        this.attackPower = 10 + ( 2 * this.level) * (.2 * this.powerLevel); // TODO: tweak multipliers
    }
}

// ==== POKEMON ====
let firemon = new Pokemon("firemon", "fire", fireAttack, flameAttack, 1, 5);
let watermon = new Pokemon("watermon", "water", waterAttack, bubbleAttack, 1, 5);
let grassmon = new Pokemon("grassmon", "grass", grassAttack, vineAttack, 1, 5);
