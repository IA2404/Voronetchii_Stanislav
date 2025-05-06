let validRarities = ["common", "uncommon", "rare", "legendary"];

/**
 * Class representing an item with a name, weight, and rarity.
 * Create a new Item.
 * @param {string} _name - The name of the item.
 * @param {number} _weight - The weight of the item.
 * @param {string} _rarity - The rarity level of the item (must be one of: "common", "uncommon", "rare", "legendary").
 * @throws Will throw an error if the rarity is invalid.
 */
class Item {
    constructor(_name, _weight, _rarity) {
        this.#name = _name;
        this.weight = _weight;
        if (!validRarities.includes(_rarity)) {
            throw new Error(`Invalid Rarity: ${_rarity}`);
        }
        this.rarity = _rarity;
    }
    // Private field for name
    #name;
    // Public properties
    weight;
    rarity;

    /**
     * Gets the item's name.
     * @returns {string} The name of the item.
     */
    getInfo() {
        return this.#name;
    }

    /**
     * Sets a new weight for the item.
     * @param {number} newWeight - The new weight to assign to the item.
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}


class Weapon extends Item {
    /**
     * Create a new Weapon.
     * @param {string} _name - The name of the weapon.
     * @param {number} _weight - The weight of the weapon.
     * @param {string} _rarity - The rarity of the weapon (must be valid).
     * @param {number} _damage - The amount of damage the weapon deals (must be >= 0).
     * @param {number} _durability - The durability of the weapon (must be >= 0).
     * @throws Will throw an error if damage or durability is negative.
     */
    constructor(_name, _weight, _rarity, _damage, _durability) {
        super(_name, _weight, _rarity);

        if (_damage < 0) {
            throw new Error(`Invalid Damage: ${_damage}`);
        }
        this.damage = _damage;

        if (_durability < 0) {
            throw new Error(`Invalid Durability: ${_durability}`);
        }
        this.durability = _durability;
    }

    // Public properties
    damage;
    durability;

    use() {
        if (this.durability > 0) {
            this.durability -= 10;
        } else {
            console.log("Weapon is broken");
        }
    }

    repair() {
        this.durability = 100;
    }
}

console.log("\nTest\n");

const shield = new Item("Default Shield", 5, "uncommon");
shield.setWeight(7);
console.log(shield.getInfo());
console.log(shield.weight);

const sword = new Item("Steel Sword", 5, "rare"); // Исправлено: удалена лишняя запятая
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.weight);

const bow = new Weapon("Longbow", 1.0, "uncommon", 15, 100);
console.log(bow.getInfo());
console.log(bow.durability);
bow.use();
console.log(bow.durability);
bow.repair();

const brokenSword = new Weapon("Broken Sword", 1.0, "common", 5, 0);
console.log(brokenSword.getInfo());
brokenSword.use();
brokenSword.repair();
console.log(brokenSword.getInfo());