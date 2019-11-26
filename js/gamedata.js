let Gamedata = {};
Gamedata.cards = [
    {
        id: "skeleton",
        name: "Skeleton",
        desc: "+1 difficult for each other skeleton",
        img: "skeleton",
        difficult: 6,
        damage: 1,
        tags: ["monster", "skeleton"],
        abilities: [
            {
                id: "difficult_boost",
                tag: "skeleton"
            }
        ],
        levels: {
            1: [6, 1, ""],
            3: [7, 1, ""],
            5: [7, 2, ""],
            6: [8, 2, ""]
        }
    },
    {
        id: "harpy",
        name: "Harpy",
        desc: "+1 difficult for each other harpy<br/><b>Level 3</b>: add Harpy<br/><b>Level 5</b>: add Harpy",
        img: "harpy",
        difficult: 6,
        damage: 1,
        tags: ["monster", "harpy"],
        abilities: [
            {
                id: "difficult_boost",
                tag: "harpy"
            }
        ],
        levels: {
            1: [6, 1, ""],
            2: [7, 1, ""],
            3: [7, 1, "harpy2"],
            5: [8, 1, "harpy2"],
            6: [8, 2, ""]
        }
    },
    {
        id: "harpy2",
        name: "Harpy",
        desc: "+1 difficult for each other harpy",
        img: "harpy",
        difficult: 6,
        damage: 1,
        tags: ["monster", "harpy"],
        abilities: [
            {
                id: "difficult_boost",
                tag: "harpy"
            }
        ],
        levels: {
            1: [6, 1, ""],
            2: [7, 1, ""],
            5: [8, 1, ""],
            6: [8, 2, ""]
        }
    },

    {
        id: "hydra",
        name: "Hydra",
        desc: "if you defeated you may gain a heroic deed",
        img: "hydra",
        difficult: 7,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [7, 1, ""],
            2: [8, 2, ""],
            3: [9, 2, ""],
            4: [10, 3, ""],
            5: [11, 3, ""],
            6: [11, 4, ""]
        }
    },
    {
        id: "gorgon",
        name: "Gorgon",
        desc: "if not defeated, kill all crew assigned to this card or its deadliness whichever is greater",
        img: "gorgon",
        difficult: 7,
        damage: 1,
        tags: ["monster"],
        abilities: [
            {
                id: "kill_all_soldier"
            }
        ],
        levels: {
            1: [7, 1, ""],
            3: [8, 1, ""],
            4: [7, 2, ""],
            5: [8, 2, ""]
        }
    },
    {
        id: "typhon",
        name: "Typhon",
        desc: "Level 3: add Chimera",
        img: "typhon",
        difficult: 10,
        damage: 3,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [10, 3, ""],
            2: [9, 2, ""],
            3: [9, 2, "chimera"],
            4: [8, 2, ""],
            6: [8, 1, ""]
        }
    },
    {
        id: "echidna",
        name: "Echidna",
        desc: "<b>Level 2</b>: add Nemean Lion<br/><b>Level 4</b>: add Sphinx",
        img: "echidna",
        difficult: 9,
        damage: 2,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [9, 2, ""],
            2: [9, 2, "nemean_lion"],
            3: [8, 2, ""],
            4: [8, 2, "sphinx"],
            5: [7, 1, ""]
        }
    },
    {
        id: "minotaur",
        name: "Minotaur",
        desc: "",
        img: "minotaur",
        difficult: 8,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [8, 1, ""],
            2: [9, 1, ""],
            3: [8, 2, ""],
            4: [9, 2, ""],
            6: [9, 3, ""]
        }
    },
    {
        id: "cyclops",
        name: "Cyclops",
        desc: "",
        img: "cyclops",
        difficult: 9,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [9, 1, ""],
            2: [9, 2, ""]
        }
    },
    {
        id: "cerberus",
        name: "Cerberus",
        desc: "<b>Level 3</b>: add Hade's Wrath<br/><b>Level 5</b>: add Hade's Wrath, add Helm of Hades",
        img: "cerberus",
        difficult: 8,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [8, 1, ""],
            3: [8, 2, "hades_wrath"],
            4: [10, 2, ""],
            5: [9, 2, "hades_wrath,helm_of_hades"]
        }
    },
    {
        id: "manticore",
        name: "Manticore",
        desc: "",
        img: "manticore",
        difficult: 8,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [8, 1, ""],
            2: [8, 2, ""],
            3: [9, 1, ""],
            4: [9, 2, ""],
            6: [10, 2, ""]
        }
    },
    {
        id: "colchian_dragon",
        name: "Colchian dragon",
        desc: "if defeated: +2 to treasure recovery roll this turn",
        img: "colchian_dragon",
        difficult: 9,
        damage: 1,
        tags: ["monster"],
        abilities: [
            {
                id: "defeated_treasure_bonus",
                last: 1,
                value: 2
            }
        ],
        levels: {
            1: [9, 1, ""],
            3: [9, 2, ""],
            4: [10, 2, ""],
            6: [9, 3, ""]
        }
    },
    {
        id: "scylla",
        name: "Scylla",
        desc: "before combat, you may ignore this card. if so, roll a die. on 5-6 lose half your crew",
        img: "scylla",
        difficult: 8,
        damage: 2,
        tags: ["monster"],
        abilities: [
            {
                id: "ignore_roll"
            }
        ],
        levels: {
            1: [8, 2, ""],
            4: [9, 2, ""]
        }
    },
    {
        id: "charybdis",
        name: "Charybdis",
        desc: "before combat, you may sacrifice 1 crew to ignore this card",
        img: "charybdis",
        difficult: 8,
        damage: 2,
        tags: ["monster"],
        abilities: [
            {
                id: "sacrifice_crew",
                value: 1
            }
        ],
        levels: {
            1: [8, 2, ""],
            4: [9, 2, ""]
        }
    },
    {
        id: "ketos",
        name: "Ketos",
        desc: "<b>Level 3</b>: add Poseidon's Wrath<br/><b>Level 5</b>: add Poseidon's Wrath, add Poseidon's Trident",
        img: "ketos",
        difficult: 8,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [8, 1, ""],
            3: [8, 2, "poseidons_wrath"],
            4: [10, 1, ""],
            5: [9, 1, "poseidons_wrath,poseidons_trident"],
            6: [9, 2, ""]
        }
    },
    {
        id: "khalkotaurus",
        name: "Khalkotaurus",
        desc: "",
        img: "khalkotaurus",
        difficult: 7,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [7, 1, ""],
            2: [8, 1, ""],
            3: [8, 2, ""],
            4: [9, 1, ""],
            5: [9, 2, ""]
        }
    },
    {
        id: "sirens",
        name: "Sirens",
        desc: "1 crew member may not be assigned this turn",
        img: "siren",
        difficult: 7,
        damage: 1,
        tags: ["monster"],
        abilities: [
            {
                id: "block_crew",
                value: 1
            }
        ],
        levels: {
            1: [7, 1, ""],
            5: [8, 1, ""]
        }
    },
    {
        id: "chimera",
        name: "Chimera",
        desc: "",
        img: "chimera",
        difficult: 8,
        damage: 2,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [8, 2, ""],
            2: [9, 1, ""],
            3: [8, 2, ""],
            4: [9, 2, ""],
            5: [10, 2, ""],
            6: [9, 3, ""],
        }
    },
    {
        id: "nemean_lion",
        name: "Nemean lion",
        desc: "<b>Level 3</b>: add Cloak of Heracles",
        img: "nemean_lion",
        difficult: 9,
        damage: 1,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [9, 1, ""],
            3: [10, 1, "cloak_of_heracles"],
            4: [10, 2, ""],
            6: [11, 2, ""]
        }
    },
    {
        id: "sphinx",
        name: "Sphinx",
        desc: "",
        img: "sphinx",
        difficult: 11,
        damage: 2,
        tags: ["monster"],
        abilities: [],
        levels: {
            1: [11, 2, ""],
            2: [10, 2, ""],
            3: [9, 2, ""],
            4: [8, 2, ""],
            5: [8, 1, ""],
            6: [7, 1, ""]
        }
    },
    {
        id: "helm_of_hades",
        name: "Helm of Hades",
        desc: "<b>Single-use</>: move a revealed monster card to the discard pile",
        img: "helm_of_hades",
        difficult: 6,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [6, 0, ""],
            2: [7, 0, ""],
            4: [8, 0, ""],
            6: [9, 0, ""]
        }
    },
    {
        id: "argo",
        name: "Argo",
        desc: "<b>Continuous</b>: +1 to treasure recovery roll",
        img: "argo",
        difficult: 7,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [7, 0, ""],
            2: [8, 0, ""],
            5: [9, 0, ""]
        }
    },
    {
        id: "sword_of_peleus",
        name: "Sword of Peleus",
        desc: "<b>Continuous</b>: +1 to monster combat roll",
        img: "sword_of_peleus",
        difficult: 7,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [7, 0, ""],
            2: [8, 0, ""],
            4: [9, 0, ""],
            5: [10, 0, ""]
        }
    },
    {
        id: "winged_sandals",
        name: "Winged sandals",
        desc: "<b>Single-use</b>: return the (unresolved) cards and draw 3 new cards",
        img: "winged_sandals",
        difficult: 6,
        damage: 0,
        tags: ["treasure", "global_effect"],
        abilities: [],
        levels: {
            1: [6, 0, ""],
            3: [7, 0, ""],
            5: [8, 0, ""]
        }
    },
    {
        id: "cornucopia",
        name: "Cornucopia",
        desc: "<b>Single-use</b>: recover 2 crew up to max",
        img: "cornucopia",
        difficult: 6,
        damage: 0,
        tags: ["treasure", "global_effect"],
        abilities: [],
        levels: {
            1: [6, 0, ""],
            2: [7, 0, ""],
            4: [8, 0, ""],
            6: [9, 0, ""]
        }
    },
    {
        id: "golden_fleece",
        name: "Golden fleece",
        desc: "<b>Single-use</b>: if you win, you gain an extra heroic deed at the end of the quest",
        img: "golden_fleece",
        difficult: 8,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [8, 0, ""],
            2: [9, 0, ""],
            3: [10, 0, ""],
            4: [11, 0, ""],
            5: [12, 0, ""],
        }
    },
    {
        id: "pans_flute",
        name: "Pan's flute",
        desc: "<b>Single-use</b>: discard the top two card from the adventure deck",
        img: "pans_flute",
        difficult: 6,
        damage: 0,
        tags: ["treasure", "global_effect"],
        abilities: [],
        levels: {
            1: [6, 0, ""],
            4: [7, 0, ""],
            6: [8, 0, ""],
        }
    },
    {
        id: "mirrored_shield",
        name: "Mirrored shield",
        desc: "<b>Continuous</b>: ignore negative effects of the cards",
        img: "mirrored_shield",
        difficult: 6,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [6, 0, ""],
            4: [7, 0, ""],
        }
    },
    {
        id: "orpheus_lyre",
        name: "Orpheus' lyre",
        desc: "<b>Single-use</b>: stop a monster in the victory pile from leveling up at the end of quest",
        img: "orpheus_lyre",
        difficult: 8,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [8, 0, ""],
            2: [9, 0, ""],
            5: [10, 0, ""],
        }
    },
    {
        id: "cloak_of_heracles",
        name: "Cloak of Heracles",
        desc: "<b>Continuous</b>: -1 to monster difficulty",
        img: "cloak_of_heracles",
        difficult: 6,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [6, 0, ""],
            4: [7, 0, ""]
        }
    },
    {
        id: "poseidons_trident",
        name: "Poseidon's trident",
        desc: "<b>Continuous</b>: wrath cards are treated as if they were blessing cards",
        img: "poseidons_trident",
        difficult: 6,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [6, 0, ""],
            3: [7, 0, ""],
            6: [8, 0, ""],
        }
    },
    {
        id: "ambrosia",
        name: "Ambroisa",
        desc: "<b>Single-use</b>: recover 3 crew member",
        img: "ambrosia",
        difficult: 7,
        damage: 0,
        tags: ["treasure", "global_effect"],
        abilities: [],
        levels: {
            1: [7, 0, ""],
            3: [8, 0, ""],
            4: [9, 0, ""],
            6: [10, 0, ""],
        }
    },
    {
        id: "daedalus_wings",
        name: "Daedalus' wings",
        desc: "<b>Continuous</b>: once per turn you may re-roll a combat or recovery roll",
        img: "daedalus_wings",
        difficult: 7,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [7, 0, ""],
            2: [8, 0, ""],
            4: [9, 0, ""],
            6: [10, 0, ""],
        }
    },
    {
        id: "aegis_of_zeus",
        name: "Aegis of Zeus",
        desc: "<b>Single-use</b>: if defeated by a monster, ignore the deadliness of the monster",
        img: "aegis_of_zeus",
        difficult: 8,
        damage: 0,
        tags: ["treasure"],
        abilities: [],
        levels: {
            1: [8, 0, ""],
            2: [9, 0, ""],
            5: [10, 0, ""],
        }
    },
    {
        id: "apollos_bow",
        name: "Apollo's bow",
        desc: "<b>Single-use</b>: the next roll will be 6",
        img: "apollos_bow",
        difficult: 8,
        damage: 0,
        tags: ["treasure", "global_effect"],
        abilities: [],
        levels: {
            1: [8, 0, ""],
            3: [9, 0, ""],
            6: [10, 0, ""],
        }
    },
    {
        id: "heras_blessing",
        name: "Hera's blessing",
        desc: "gods smile upon you",
        img: "heras_blessing",
        difficult: 0,
        damage: 0,
        tags: ["blessing"],
        abilities: [],
        levels: {}
    },
    {
        id: "zeus_blessing",
        name: "Zeus' blessing",
        desc: "gods smile upon you",
        img: "zeus_blessing",
        difficult: 0,
        damage: 0,
        tags: ["blessing"],
        abilities: [],
        levels: {}
    },
    {
        id: "apollo_blessing",
        name: "Apollo's blessing",
        desc: "gods smile upon you",
        img: "apollo_blessing",
        difficult: 0,
        damage: 0,
        tags: ["blessing"],
        abilities: [],
        levels: {}
    },
    {
        id: "poseidons_wrath",
        name: "Poseidon's wrath",
        desc: "gods have been angered by your hubris. draw two additional cards",
        img: "poseidons_wrath",
        difficult: 0,
        damage: 0,
        tags: ["wrath"],
        abilities: [],
        levels: {}
    },
    {
        id: "hades_wrath",
        name: "Hades' wrath",
        desc: "gods have been angered by your hubris. draw two additional cards",
        img: "hades_wrath",
        difficult: 0,
        damage: 0,
        tags: ["wrath"],
        abilities: [],
        levels: {}
    },
];

Gamedata.upgrades = [
    {
        id: "starting_crew_bonus",
        name: "+1 starting crew bonus",
        desc: "You start the quest with +1 crew.",
        cost: 1
    },
    {
        id: "starting_crew_bonus",
        name: "+1 starting crew bonus",
        desc: "You start the quest with +1 crew.",
        cost: 2
    },
    {
        id: "starting_crew_bonus",
        name: "+1 starting crew bonus",
        desc: "You start the quest with +1 crew.",
        cost: 3
    },
    {
        id: "add_aegis_of_zeus",
        name: "Add Aegis of Zeus",
        desc: "Single use: If defeated by a monster, ignore the deadliness of the monster.",
        cost: 2
    },
    {
        id: "add_apollos_bow",
        name: "Add Apollo's Bow",
        desc: "Single use: The next roll will be 6.",
        cost: 2
    },
    {
        id: "add_ambrosia",
        name: "Add Ambrosia",
        desc: "Single use: Recover 3 crew (up to starting count)",
        cost: 2
    },
    {
        id: "add_daedalus_wings",
        name: "Add Daedalus' Wings",
        desc: "Continuous: Once per turn you may re-roll a combat or recovery roll.",
        cost: 2
    },
    {
        id: "add_zeus_blessing",
        name: "Add Zeus' Blessing",
        desc: "",
        cost: 1
    },
    {
        id: "add_zeus_blessing",
        name: "Add Zeus' Blessing",
        desc: "",
        cost: 1
    },
    {
        id: "add_apollos_blessing",
        name: "Add Apollo's Blessing",
        desc: "",
        cost: 1
    },
    {
        id: "add_apollos_blessing",
        name: "Add Apollo's Blessing",
        desc: "",
        cost: 1
    }
];

Gamedata.effects = [
    {
        id: "block_crew",
        desc: "1 soldier may not be assigned this turn"
    },
    {
        id: "apollos_bow",
        desc: "the next roll will be 6"
    },
    {
        id: "treasure_bonus",
        desc: "+1 to treasure recovery roll"
    },
    {
        id: "combat_bonus",
        desc: "+1 to combat roll against monsters"
    },
    {
        id: "mirrored_shield",
        desc: "the negative effects of the cards are ignored"
    },
    {
        id: "cloak_of_heracles",
        desc: "-1 to monster difficult"
    },
    {
        id: "poseidons_trident",
        desc: "wrath cards are treated as if they were blessing cards"
    },
    {
        id: "daedalus_wings",
        desc: "once per turn you may re-roll a combat or recovery roll"
    },
    {
        id: "defeated_treasure_bonus",
        desc: "+2 to treasure recovery roll this turn"
    }
];

Gamedata.imageList = [
    'img/amphora.png',
    'img/bg.png',
    'img/dice.png',
    'img/pile_discard.png',
    'img/pile_quest.png',
    'img/pile_victory.png',
    'img/scenes-from-the-story-of-the-argonauts-bb7776.jpg',
    'img/shield_monster.png',
    'img/shield_soldier.png',
    'img/skull.png',
    'img/soldier.png',
    'img/soldier_occupied.png',
    'img/soldier_wounded.png',
    'img/star_empty.png',
    'img/star_filled.png',
    'img/sword.png',
    'img/sword3.png',
    'img/lapok/aegis_of_zeus.png',
    'img/lapok/ambrosia.png',
    'img/lapok/apollos_blessing.png',
    'img/lapok/apollos_bow.png',
    'img/lapok/argo.png',
    'img/lapok/cerberus.png',
    'img/lapok/charybdis.png',
    'img/lapok/chimera.png',
    'img/lapok/cloak_of_heracles.png',
    'img/lapok/colchian_dragon.png',
    'img/lapok/cornucopia.png',
    'img/lapok/cyclops.png',
    'img/lapok/daedalus_wings.png',
    'img/lapok/echidna.png',
    'img/lapok/golden_fleece.png',
    'img/lapok/gorgon.png',
    'img/lapok/hades_wrath.png',
    'img/lapok/harpy.png',
    'img/lapok/helm_of_hades.png',
    'img/lapok/heras_blessing.png',
    'img/lapok/hydra.png',
    'img/lapok/ketos.png',
    'img/lapok/khalkotaurus.png',
    'img/lapok/manticore.png',
    'img/lapok/minotaur.png',
    'img/lapok/mirrored_shield.png',
    'img/lapok/nemean_lion.png',
    'img/lapok/orpheus_lyre.png',
    'img/lapok/pans_flute.png',
    'img/lapok/poseidons_trident.png',
    'img/lapok/poseidons_wrath.png',
    'img/lapok/scylla.png',
    'img/lapok/siren.png',
    'img/lapok/skeleton.png',
    'img/lapok/sphinx.png',
    'img/lapok/sword_of_peleus.png',
    'img/lapok/typhon.png',
    'img/lapok/winged_sandals.png',
    'img/lapok/zeus_blessing.png'
];

Gamedata.starterDeck = {
    "skeleton": 3,
    "harpy": 2,
    "hydra": 1,
    "gorgon": 1,
    "typhon": 1,
    "echidna": 1,
    "minotaur": 1,
    "cyclops": 1,
    "cerberus": 1,
    "manticore": 1,
    "colchian_dragon": 1,
    "scylla": 1,
    "charybdis": 1,
    "ketos": 1,
    "khalkotaurus": 2,
    "sirens": 1,
    "argo": 1,
    "sword_of_peleus": 1,
    "winged_sandals": 1,
    "cornucopia": 1,
    "golden_fleece": 1,
    "pans_flute": 1,
    "mirrored_shield": 1,
    "orpheus_lyre": 1,
    "heras_blessing": 2,
};

Gamedata.testDeck = {
    "skeleton": 1,
    "harpy": 1,
    "golden_fleece": 1,
    "colchian_dragon": 1,
    "sirens": 1,
};

Gamedata.tutorialDeck = {
    "skeleton": 1,
    "harpy": 2,
    "heras_blessing": 1,
    "golden_fleece": 1,
    "gorgon": 1,
    "hydra": 1,
    "orpheus_lyre": 1,
};
