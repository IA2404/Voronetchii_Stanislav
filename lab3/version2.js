let validRarities = ["common", "uncommon", "rare", "legendary"]

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
        this.name = _name;
        this.weight = _weight;
        if (!validRarities.includes(_rarity)) {
            throw new Error(`Invalid Rarity: ${_rarity}`);
        }
        this.rarity = _rarity;

    }
    #name;
    weight;
    rarity;

    /**
     * Gets the item's name.
     * @returns {string} The name of the item.
     */
    getInfo() {
        return this.name;
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
        } else {
            this.damage = _damage;
        }
        if (_durability < 0) {
            throw new Error(`Invalid Durability: ${_durability}`);
        } else {
            this.durability = _durability;
        }
    }

    damage;
    durability;

    use() {
        if (this.durability > 0) {
            this.durability -= 10;
        }
        else {
            console.log("Weapon is broken");
        }
    }
    repair() {
        this.durability = 100;
    }
}

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.weight);


const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(bow?.durability.toString());
console.log(bow?.somemethod);
bow.repair();