
let Game = {
    MAX_LEVEL: 6,

    RESULT_NONE: "none",
    RESULT_WIN: "win",
    RESULT_LOSE: "lose",
    RESULT_IGNORE: "ignore",

    maxSoldiers: 0,
    soldiers: 0,
    usedSoldiers: 0,
    woundedSoldiers: 0,

    questDeck: [],
    victoryPile: [],
    discardPile: [],

    questStatus: "none",
    tasks: [],

    treasures: [],
    effects: [],

    resolveReroll: 0,

    gatheredHeroicDeeds: 0,
    xp: 0,
    successQuests: 0,
    failedQuests: 0,

    heroicdeeds: [],

    questResult: {
        xp: 0,
        hydraDefeated: false,
        goldenfleeceDefeated: false,
        orpheuslyreDefeated: false
    }
};

Game.startNew = function() {

    Game.xp = 0;
    Game.gatheredHeroicDeeds = 0;
    Game.successQuests = 0;
    Game.failedQuests = 0;

    Game.maxSoldiers = 12;
    Game.soldiers = 12;
    Game.usedSoldiers = 0;

    Game.questDeck = [];
    // for(let cardid in Gamedata.starterDeck) {
    //     for(let i = 0; i < Gamedata.starterDeck[cardid]; i++) {
    //         Game.questDeck.push(Game.Gamedata.getCard(cardid));
    //     }
    // }

    // for(let cardid in Gamedata.tutorialDeck) {
    //     for(let i = 0; i < Gamedata.tutorialDeck[cardid]; i++) {
    //         Game.questDeck.push(Game.Gamedata.getCard(cardid));
    //     }
    // }

    for(let cardid in Gamedata.testDeck) {
        for(let i = 0; i < Gamedata.testDeck[cardid]; i++) {
            Game.questDeck.push(Game.Gamedata.getCard(cardid));
        }
    }

    Game.victoryPile = [];
    Game.discardPile = [];
    Game.tasks = [];

    Game.heroicdeeds = [];
    for(let i = 0; i < Gamedata.upgrades.length; i++) {
        Game.heroicdeeds.push(new Game.HeroicDeed(Gamedata.upgrades[i]));
    }
    // Game.heroicdeeds[1].xp = 1;
 };

Game.startQuest = function() {
    Game.questStatus = Game.RESULT_NONE;

    Game.questDeck = Utils.shuffle(Game.questDeck);
    Game.questDeck = Utils.shuffle(Game.questDeck);

    // Game.questDeck.push(Game.Gamedata.getCard("apollos_bow"));    

    Game.victoryPile = [];
    Game.discardPile = [];
    Game.tasks = [];
    Game.treasures = [];
    Game.effects = [];

    Game.maxSoldiers = 12;
    Game.soldiers = 12;
    Game.usedSoldiers = 0;
    Game.woundedSoldiers = 0;

    Game.resolveReroll = 0;

    Game.questResult.xp = 0;
    Game.questResult.hydraDefeated = false;
    Game.questResult.goldenfleeceDefeated = false;
    Game.questResult.orpheuslyreDefeated = false;
    
    //  test
    // Game.questDeck = Game.questDeck.slice(0, 3);

    Game.soldiers = 20;
    
    //  test end


    Game.startTurn();
};

Game.giveUpQuest = function() {
    Game.failedQuests += 1;
    for(let i = 0; i < Game.tasks.length; i++) {
        Game.questDeck.push(Game.tasks[i].card);
    }
    for(let i = 0; i < Game.victoryPile.length; i++) {
        Game.questDeck.push(Game.victoryPile[i]);
    }
    for(let i = 0; i < Game.discardPile.length; i++) {
        Game.questDeck.push(Game.discardPile[i]);
    }
};

Game.endQuest = function(selectedCard) {
    if (Game.questStatus == Game.RESULT_WIN) {
        Game.successQuests += 1;
        for(let i = 0; i < Game.victoryPile.length; i++) {
            if (selectedCard == Game.victoryPile[i]) continue;
            Game.victoryPile[i].levelUp();
        }
    }
    else {
        Game.failedQuests += 1;
    }

    //  lapokat visszarakni
    for(let i = 0; i < Game.victoryPile.length; i++) {
        Game.questDeck.push(Game.victoryPile[i]);
    }
    for(let i = 0; i < Game.discardPile.length; i++) {
        Game.questDeck.push(Game.discardPile[i]);
    }

    Game.xp += Game.questResult.xp;
    Game.gatheredHeroicDeeds += Game.questResult.xp;
};

Game.prepareQuestEnd = function() {
    Game.questResult.xp = 0;

    for(let i = 0; i < Game.victoryPile.length; i++) {
        if (Game.victoryPile[i].id == "hydra") {
            Game.questResult.hydraDefeated = true;
            Game.questResult.xp += 1;
        }
        if (Game.victoryPile[i].id == "golden_fleece" && Game.questStatus == Game.RESULT_WIN) {
            Game.questResult.goldenfleeceDefeated = true;
            Game.questResult.xp += 1;
        }
        if (Game.victoryPile[i].id == "orpheus_lyre") {
            Game.questResult.orpheuslyreDefeated = true;
        }
    }

    if (Game.questStatus == Game.RESULT_WIN) {
        Game.questResult.xp += 1;
    }
};

Game.addCardToQuest = function(id) {
    Game.questDeck.push(Game.Gamedata.getCard(id));    
};

Game.startTurn = function() {
    //  huzni 3 lapot
    //  ha van kozte wrath, akkor +2-t huzni
    //  aktivalni play abilitiket

    let drawNum = Math.min(3, Game.questDeck.length);

    Game.tasks = [];
    let haveToDraw = drawNum > 0 ? true: false;
    while(haveToDraw) {
        let card = Game.questDeck.pop();
        drawNum -= 1;
        Game.tasks.push(new Game.Task(card));

        if (card.hasTag("wrath") && !Game.isEffectActive("poseidons_trident")) {
            drawNum = Math.min(drawNum + 2, Game.questDeck.length);
        }
        if (drawNum == 0) haveToDraw = false;
    }

    for(let i = 0; i < Game.tasks.length; i++) {
        if (Game.isEffectActive("cloak_of_heracles") && Game.tasks[i].hasTag("monster")) {
            Game.tasks[i].difficult -= 1;
        }
        if (Game.isEffectActive("mirrored_shield")) continue;        
        if (Game.tasks[i].hasAbility("difficult_boost")) {
            let ability = Game.tasks[i].getAbility("difficult_boost");
            let boost = 0;
            for(let k = 0; k < Game.tasks.length; k++) {
                if (i == k) continue;
                if (Game.tasks[k].card.hasTag(ability.tag)) { boost += 1; }
            }
            Game.tasks[i].difficult += boost;
        }
        if (Game.tasks[i].hasAbility("block_crew")) {
            let ability = Game.tasks[i].getAbility("block_crew");
            Game.effects.push(new Game.Effect("block_crew", 1, Game.tasks[i].card));
            Game.usedSoldiers += ability.value;
            Game.soldiers -= ability.value;
        }
    }
    
    if (Game.isEffectActive("daedalus_wings")) {
        Game.resolveReroll = 1;
    }
};

Game.endTurn = function() {
    for(let i = 0; i < Game.tasks.length; i++) {
        if (Game.tasks[i].result == Game.RESULT_NONE) {
            Game.Taskresolver.forceResolve(Game.tasks[i]);
        }
        if (Game.tasks[i].result == Game.RESULT_WIN) {
            Game.victoryPile.push(Game.tasks[i].card);
        }
        else {
            Game.discardPile.push(Game.tasks[i].card);
        }
    }

    Game.soldiers += Game.usedSoldiers;
    Game.usedSoldiers = 0;

    let expiredEffects = [];
    for(let i = 0; i < Game.effects.length; i++) {
        if (Game.effects[i].duration > 0) Game.effects[i].duration -= 1;
        if (Game.effects[i].duration == 0) expiredEffects.push(Game.effects[i]);
    }
    for(let i = 0; i < expiredEffects.length; i++) {
        let index = Game.effects.indexOf(expiredEffects[i]);
        Game.effects.splice(index, 1);
    }

    if (Game.soldiers < 1) {
        Game.questStatus = Game.RESULT_LOSE;
        Game.prepareQuestEnd();
    }
    else if (Game.questDeck.length < 1) {
        Game.questStatus = Game.RESULT_WIN;
        Game.prepareQuestEnd();
    }
};

Game.isAllTaskResolved = function() {
    for(let i = 0; i < Game.tasks.length; i++) {
        if (Game.tasks[i].needToResolve() && !Game.tasks[i].isResolved()) return false;
    }
    return true;
};

Game.getResolvedTasks = function() {
    let num = 0;
    for(let i = 0; i < Game.tasks.length; i++) {
        if (Game.tasks[i].isResolvable() && Game.tasks[i].isResolved()) num += 1;
    }
    return num;
};

Game.isEffectActive = function(id) {
    for(let i = 0; i < Game.effects.length; i++) {
        if (Game.effects[i].id == id) return true;
    }
    return false;
};

Game.removeEffect = function(id) {
    let index = -1;
    for(let k = 0; k < Game.effects.length; k++) {
        if (Game.effects[k].id == id) {
            index = k;
            break;
        }
    }
    if (index > -1) Game.effects.splice(index, 1);
};

//  a megszerzett kincsek kozul keresi ki
Game.getTreasure = function(id) {
    for(let i = 0; i < Game.treasures.length; i++) {
        if (Game.treasures[i].id == id) return Game.treasures[i];
    }
    return null;
};

Game.hasTreasure = function(id) {
    for(let i = 0; i < Game.treasures.length; i++) {
        if (Game.treasures[i].id == id) return true;
    }
    return false;
};

Game.removeTreasure = function(id) {
    let index = -1;
    for(let i = 0; i < Game.treasures.length; i++) {
        if (Game.treasures[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) Game.treasures.splice(index, 1);
};

Game.useTreasure = function(card, task) {
    switch(card.id) {
        case "helm_of_hades":
            task.result = Game.RESULT_IGNORE;
            break;
        case "winged_sandals":
            // if (Game.getResolvedTasks() > 0) return;
            Game.reDraw();
            break;
        case "cornucopia":
            let n = Math.min(2, Game.woundedSoldiers);
            Game.soldiers += n;
            Game.woundedSoldiers -= n;
            break;
        case "ambrosia": {
            let n = Math.min(3, Game.woundedSoldiers);
            Game.soldiers += n;
            Game.woundedSoldiers -= n;
            }
            break;
        case "pans_flute":
            let k = Math.min(2, Game.questDeck.length);
            for(let i = 0; i < k; i++) {
                Game.discardPile.push( Game.questDeck.pop() );
            }
            break;
        case "apollos_bow":
            Game.effects.push(new Game.Effect("apollos_bow", 9999, card));
            break;
    }
    Game.removeTreasure(card.id);
};

Game.diceRoll = function() {
    let roll = Utils.random(1, 7);
    if (Game.isEffectActive("apollos_bow")) {
        Game.removeEffect("apollos_bow");
        roll = 6;
    }
    return roll;
};

Game.spendXp = function(heroicdeed) {
    if (Game.xp < 1) return;
    if ( !heroicdeed.canAddXp()) return;
    Game.xp -= 1;
    heroicdeed.addXp();
    if (heroicdeed.isFilled()) {
        switch(heroicdeed.id) {
            case "starting_crew_bonus":
                Game.maxSoldiers += 1;
                break;
            case "add_aegis_of_zeus":
                Game.questDeck.push(Game.Gamedata.getCard("aegis_of_zeus"));
                break;
            case "add_apollos_bow":
                Game.questDeck.push(Game.Gamedata.getCard("apollos_bow"));
                break;
            case "add_ambrosia":
                Game.questDeck.push(Game.Gamedata.getCard("ambrosia"));
                break;
            case "add_daedalus_wings":
                Game.questDeck.push(Game.Gamedata.getCard("daedalus_wings"));
                break;
            case "add_zeus_blessing":
                Game.questDeck.push(Game.Gamedata.getCard("zeus_blessing"));                
                break;
            case "add_apollos_blessing":
                Game.questDeck.push(Game.Gamedata.getCard("apollo_blessing"));                
                break;
        }
    }
};

//  winged_sandals hatasa
//  ujraosztas
//  a megoldatlan lapokat visszateszi es ujra huz 3-t
Game.reDraw = function() {
    for(let i = 0; i < Game.tasks.length; i++) {
        Game.soldiers += Game.tasks[i].assignedSoldiers;

        if (Game.tasks[i].isResolved()) {
            if (Game.tasks[i].result == Game.RESULT_WIN) {
                Game.victoryPile.push(Game.tasks[i].card);
            }
            else {
                Game.discardPile.push(Game.tasks[i].card);
            }
        }
        else {
            Game.questDeck.push(Game.tasks[i].card);            
        }

        if (Game.tasks[i].getCardId() == "sirens") {
            Game.soldiers += 1;
            Game.usedSoldiers -= 1;
            Game.removeEffect("block_crew");
        }
    }

    Game.questDeck = Utils.shuffle(Game.questDeck);
    Game.startTurn();
};

Game.sacrificeCrew = function(task) {
    Game.soldiers -= 1;
    Game.woundedSoldiers += 1;
    task.result = Game.RESULT_IGNORE;
};

//  scylla lap
Game.IgnoreRoll = {
    task: null,
    roll: 0,
    init: function(task) {
        this.task = task;
        this.roll = Game.diceRoll();
    },
    getDesc: function() {
        let s = "Roll: " + this.roll;
        if (this.roll > 4) s += " Failed";
        else s += " Successful";
        return s;
    },
    process: function() {
        Game.soldiers += this.task.assignedSoldiers;
        this.task.assignedSoldiers = 0;
        if (this.roll > 4) {
            let allSoldiers = Game.soldiers + Game.usedSoldiers;
            for(let i = 0; i < Game.tasks.length; i++) {
                allSoldiers += Game.tasks[i].assignedSoldiers;
            }
            let dmg = Math.floor(allSoldiers / 2);
            Game.DamageHandler.start(dmg);
        }
        this.task.result = Game.RESULT_IGNORE;
        this.task = null;
    }
};

Game.Taskresolver = {
    task: null,
    difficult: 0,
    modifiers: [],
    roll: 0,
    attackValue: 0,
    result: null,
    ignoreDamage: false,
    init: function(task) {
        this.task = task;
        this.difficult = task.difficult;
        this.ignoreDamage = false;
        this._calculate();
    },
    _calculate: function() {
        this.attackValue = 0;

        if (this.task.assignedSoldiers > 0) {

            this.roll = Game.diceRoll();
            this.attackValue = this.task.assignedSoldiers + this.roll;

            this.attackValue += this.getAttackBonus();

            if (this.roll == 6 || this.attackValue >= this.difficult) {
                this.result = Game.RESULT_WIN;
            }
            else {
                this.result = Game.RESULT_LOSE;
            }
        }
        else {
            //  ha nincs katona, automatikusan sikertelen
            this.result = Game.RESULT_LOSE;
        }
    },
    reroll: function() {
        Game.resolveReroll -= 1;
        this._calculate();
    },
    getAttackBonus: function() {
        let bonus = 0;
        for(let i = 0; i < Game.effects.length; i++) {
            if (this.task.card.hasTag("treasure") && Game.effects[i].id == "defeated_treasure_bonus") bonus += 2;
            if (this.task.card.hasTag("treasure") && Game.effects[i].id == "treasure_bonus") bonus += 1;
            if (this.task.card.hasTag("monster") && Game.effects[i].id == "combat_bonus") bonus += 1;
        }
        return bonus;
    },
    //  aegis_of_zeus kincs
    cancelDamage: function() {
        this.ignoreDamage = true;
        this.process();
        Game.removeTreasure("aegis_of_zeus");
    },
    //  a tenyleges valtoztatasok elvegzese
    process: function() {
        if (this.result == Game.RESULT_WIN) {
            if (this.task.card.hasTag("treasure")) {
                Game.treasures.push(Game.Gamedata.getCard(this.task.getCardId()));
                if (this.task.getCardId() == "argo") {
                    Game.effects.push(new Game.Effect("treasure_bonus", 9999, this.task.card));
                }
                if (this.task.getCardId() == "sword_of_peleus") {
                    Game.effects.push(new Game.Effect("combat_bonus", 9999, this.task.card));
                }
                if (this.task.getCardId() == "mirrored_shield") {
                    Game.effects.push(new Game.Effect("mirrored_shield", 9999, this.task.card));
                }
                if (this.task.getCardId() == "cloak_of_heracles") {
                    Game.effects.push(new Game.Effect("cloak_of_heracles", 9999, this.task.card));
                }
                if (this.task.getCardId() == "poseidons_trident") {
                    Game.effects.push(new Game.Effect("poseidons_trident", 9999, this.task.card));
                }
                if (this.task.getCardId() == "daedalus_wings") {
                    Game.effects.push(new Game.Effect("daedalus_wings", 9999, this.task.card));
                    Game.resolveReroll = 1;
                }
            }
            if (this.task.hasAbility("defeated_treasure_bonus")) {
                Game.effects.push(new Game.Effect("defeated_treasure_bonus", 1, this.task.card));
            }
        }
        else {
            if (this.task.card.hasTag("monster")) { 
                if ( !this.ignoreDamage) Game.DamageHandler.start(this.task.getDamage());
            }
            // else if (this.task.card.hasTag("treasure")) { this.processTreasure(); }
        }

        Game.usedSoldiers += this.task.assignedSoldiers;
        this.task.result = this.result;
        this.task = null;
    },
    //  ha nem oldotta meg
    forceResolve: function(task) {
        if (task.assignedSoldiers > 0) {
            Game.soldiers += task.assignedSoldiers;
            task.assignedSoldiers = 0;
        }
        this.init(task);
        this.process();
    }
};

Game.DamageHandler = {
    start: function(damage) {
        damage = this._removeAssignedSoldiers(damage);
        damage = this._removeFreeSoldiers(damage);
        damage = this._removeUsedSoldiers(damage);
        this._removeOtherAssignedSoldiers(damage);
    },
    _removeAssignedSoldiers: function(amount) {
        if (amount < 1) return amount;
        if (Game.Taskresolver.task == null) return amount;
        let dmg = Math.min(amount, Game.Taskresolver.task.assignedSoldiers);
        if (Game.Taskresolver.task.hasAbility("kill_all_soldier") && Game.Taskresolver.task.assignedSoldiers > 0) {
            dmg = Game.Taskresolver.task.assignedSoldiers;
        }
        Game.Taskresolver.task.assignedSoldiers -= dmg;
        Game.woundedSoldiers += dmg;
        amount -= dmg;
        return amount;
    },
    _removeFreeSoldiers: function(amount) {
        if (amount < 1) return amount;
        let dmg = Math.min(amount, Game.soldiers);
        Game.soldiers -= dmg;
        Game.woundedSoldiers += dmg;
        amount -= dmg;
        return amount;
    },
    _removeUsedSoldiers: function(amount) {
        if (amount < 1) return amount;
        let dmg = Math.min(amount, Game.usedSoldiers);
        Game.usedSoldiers -= dmg;
        Game.woundedSoldiers += dmg;
        amount -= dmg;
        return amount;
    },
    _removeOtherAssignedSoldiers: function(amount) {
        if (amount < 1) return amount;
        for(let i = 0; i < Game.tasks.length; i++) {
            // if (Game.tasks[i] == this.task) continue;
            let dmg = Math.min(amount, Game.tasks[i].assignedSoldiers);
            Game.tasks[i].assignedSoldiers -= dmg;
            Game.woundedSoldiers += dmg;
            amount -= dmg;
            if (amount < 1) break;
        }
        return amount;
    }
};

Game.Quest = {
    tasks: [],
    start: function() {
        this.tasks = [];
        for(let i = 0; i < 3; i++) {
            let task = new Game.Task(Game.deck.pop());
            this.tasks.push(task);
        }
    }
};

//  ==========================================================================================================
//      Gamedata
//  ==========================================================================================================

Game.Gamedata = {};
Game.Gamedata.getCard = function(id) {
    for(let i = 0; i < Gamedata.cards.length; i++) {
        if (Gamedata.cards[i].id == id) {
            return new Game.Card(Gamedata.cards[i]);
        }
    }
    console.warn("Game.Gamedata.getCard, ismeretlen id: " + id);
    return null;
}

Game.Gamedata.getEffect = function(id) {
    for(let i = 0; i < Gamedata.effects.length; i++) {
        if (Gamedata.effects[i].id == id) { return Gamedata.effects[i]; }
    }
    console.warn("Game.Gamedata.getEffect, ismeretlen id: " + id);
    return null;
};

//  ================================================================================================================
//      Utils
//  ================================================================================================================

Game.Util = {};
Game.Util.getResult = function(result) {
    if (result == Game.RESULT_WIN) return "Successful";
    if (result == Game.RESULT_LOSE) return "Failed";
    if (result == Game.RESULT_IGNORE) return "Ignored";
    return "ismeretlen";
}
Game.Util.getLevelData = function(levelData, level) {
    let currentIndex = "1";
    for(let lvl in levelData) {
        if (parseInt(lvl) > level) break;
        currentIndex = lvl;            
    }
    return levelData[currentIndex];
}


//  ==================================================================================================================
//      Classes
//  ==================================================================================================================

Game.Card = class {
    constructor(template) {
        this.id = template.id;
        this.name = template.name;
        this.desc = template.desc;
        this.img = template.img;
        //  alap difficult
        this.baseDifficult = template.difficult;
        this.difficult = template.difficult;
        this.damage = template.damage;
        this.level = 1;
        // this.levels = template.levels;

        this.levels = [];
        if ('1' in template.levels) {
            for(let i = 0; i < Game.MAX_LEVEL; i++) {
                let data = Game.Util.getLevelData(template.levels, (i+1));
                this.levels.push([(i+1), data[0], data[1], data[2]]);
            }
        }

        this.tags = [];
        for(let i = 0; i < template.tags.length; i++) {
            this.tags.push(template.tags[i]);
        }
        this.abilities = [];
        for(let i = 0; i < template.abilities.length; i++) {
            this.abilities.push(template.abilities[i]);
        }
    }
    hasTag(tag) {
        return this.tags.indexOf(tag) > -1;
    }
    hasAbility(id) {
        for(let i = 0; i < this.abilities.length; i++) {
            if (this.abilities[i].id == id) return true;
        }
        return false;
    }
    getAbility(id) {
        for(let i = 0; i < this.abilities.length; i++) {
            if (this.abilities[i].id == id) return this.abilities[i];
        }
        return null;
    }
    isNegative() { return this.hasTag("monster"); }
    isPositive() { return this.hasTag("blessing") || this.hasTag("treasure"); }
    canLevelUp() { return this.level < Game.MAX_LEVEL; }
    levelUp() {
        if ( !this.canLevelUp()) return;
        this.level += 1;
        if (this.level > Game.MAX_LEVEL) return;
        let index = this.level - 1;
        this.difficult = this.levels[index][1];
        this.damage = this.levels[index][2];
        if (this.levels[index][3]) {
            let cards = this.levels[index][3].split(",");
            for(let i = 0; i < cards.length; i++) {
                Game.addCardToQuest(cards[i]);
            }
        }
    }
}

//  egy korben megoldando feladatok (a huzott lap + a szukseges adatok)
Game.Task = class {
    constructor(card) {
        this.card = card;
        this.assignedSoldiers = 0;
        this.result = Game.RESULT_NONE;
        this.baseDifficult = card.difficult;
        this.difficult = card.difficult;
        this.damage = card.damage;
        this.isPositive = card.hasTag("blessing") || card.hasTag("treasure");
        this.isNegative = card.hasTag("monster");
    }
    getCardId() { return this.card.id; }
    isResolved() { return this.result != Game.RESULT_NONE; }
    isResolvable() { 
        if (this.card.hasTag("wrath") || this.card.hasTag("blessing")) return false;
        return true;
    }
    needToResolve() { 
        if (this.card.hasTag("wrath") || this.card.hasTag("blessing")) return false;
        return this.result == Game.RESULT_NONE;
    }
    isSuccess() { return this.result == Game.RESULT_WIN; }
    isFailed() { return this.result == Game.RESULT_LOSE; }
    getDifficult() { return this.difficult; }
    getDamage() { return this.damage; }
    getLevel() { return this.card.level; }
    hasAbility(id) { return this.card.hasAbility(id); }
    getAbility(id) { return this.card.getAbility(id); }
}

Game.Effect = class {
    constructor(id, duration, card = null) {
        //  id
        //  meddig tart
        //  desc
        this.id = id;
        this.card = card;
        this.duration = duration;
        this.effectData = Game.Gamedata.getEffect(id);
    }
    getDesc() {
        //  mi okozza: mit csinal
        //  ha nincs mi okozza, akkor csak a mit csinal
        if (this.card == null) return this.effectData.desc;
        else return '<b>' + this.card.name + "</b>: " + this.effectData.desc;
    }
}

Game.HeroicDeed = class {
    constructor(template) {
        this.id = template.id;
        this.name = template.name;
        this.desc = template.desc;
        this.cost = template.cost;
        this.xp = 0;
    }
    addXp() {
        if (this.xp < this.cost) this.xp += 1;
    }
    canAddXp() { return this.xp < this.cost; }
    isFilled() { return this.xp == this.cost; }
}