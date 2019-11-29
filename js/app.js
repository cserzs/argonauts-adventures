var app = angular.module('EuropeGame', ['ngSanitize']);

app.filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
});

app.factory('Game', function() { return Game; });

app.factory('Store', function() {
    let store = {
        ID: "argonauts",
        save: function(data) {
            localStorage.setItem(this.ID, JSON.stringify(data));
        },
        getSavedData: function() {
            return localStorage.getItem(this.ID) ? JSON.parse(localStorage.getItem(this.ID)) : [];
        }
    };
    return store;
});

app.controller('GameController', ['$scope', 'Game', 'preloader', 'Store',
    function($scope, Game, preloader, Store) {
        $scope.isLoaded = false;
        $scope.isError = false;
        $scope.errorMessage = "";

        $scope.Game = Game;
        $scope.Gamestate = Game.Statemanager.states;

        preloader.preloadImages( Gamedata.imageList )
            .then(function() {
                loadGame();
            },
            function(param) { 
                $scope.errorMessage = param;
                $scope.isError = true;
            });

        let loadGame = function() {
            let data = Store.getSavedData();
            if (data.length > 0) {
                Game.load(data);
            }
            showMenuScreen();
        };
        let showMenuScreen = function() {
            $scope.isLoaded = true;
            Game.Statemanager.show("menuscreen");
        }
    }
]);

app.controller('MenuScreenController', ['$scope', 'Game',
    function($scope, Game) {

        $scope.canContinue = Game.isActiveGame;

        $scope.startNewGame = function() {
            Game.startNew();
            Game.Statemanager.show("main");
        };
        $scope.continueGame = function() {
            Game.Statemanager.show("main");
        }
    }
]);

app.controller('MainController', ['$scope', 'Game',
    function($scope, Game) {

        $scope.successQuests = Game.successQuests;
        $scope.failedQuests = Game.failedQuests;
    
        $scope.soldiers = Game.maxSoldiers;
        $scope.winlimit = Game.WIN_LIMIT;
        $scope.gatheredHeroicDeeds = Game.gatheredHeroicDeeds;
        $scope.xp = Game.xp;
        $scope.score = Game.score;

        $scope.showHeroicDeeds = function() {
            Game.Statemanager.show("heroicdeeds");
        };
        $scope.startQuest = function() {
            Game.startQuest();
            Game.Statemanager.showPartial("quest", "list");
        };
        $scope.home = function() {
            Game.Statemanager.show("menuscreen");
        }

    }
]);

app.controller('HeroicDeedsController', ['$scope', 'Game', 'Store',
    function($scope, Game, Store) {

        let changed = false;

        $scope.heroicdeeds = Game.heroicdeeds;
        $scope.xp = Game.xp;

        $scope.addXp = function(heroicdeed) {
            if (Game.xp < 1) return;
            Game.spendXp(heroicdeed);
            changed = true;
            update($scope);
        };

        $scope.back = function() {
            if (changed) Store.save(Game.getDataForSave());
            Game.Statemanager.show("main");
        };

        let update = function($scope) {
            $scope.xp = Game.xp;
        }
    }
]);

app.controller('QuestController', ['$scope', 'Game', 'Store',
    function($scope, Game, Store) {

        $scope.treasures = Game.treasures;
        $scope.effects = Game.effects;

        $scope.proba = function() {
            console.log("proba");
            Game.Statemanager.MessageBox.show(function(btnId) { console.log("messagebox result: " + btnId); }, "Cim", "Proba", "Bezar", "Aktival");
            // Game.Statemanager.showPartial("quest", "win");
        };

        $scope.addSoldier = function(task) {
            if (Game.soldiers < 1) return;
            task.assignedSoldiers += 1;
            Game.soldiers -= 1;
        };
        $scope.removeSoldier = function(task) {
            if (task.assignedSoldiers < 1) return;
            task.assignedSoldiers -= 1;
            Game.soldiers += 1;
        };
        $scope.ignoreRoll = function(task) {
            Game.IgnoreRoll.init(task);
            Game.Statemanager.MessageBox.show(function(btnId) {
                Game.IgnoreRoll.process();
            },
            "Trying Ignore", Game.IgnoreRoll.getDesc(), "Close");
        };
        $scope.sacrificeCrew = function(task) {
            if (Game.soldiers < 1) return;
            Game.Statemanager.MessageBox.show(function(btnId) {},
                "Sacrifice Soldier", "You have sacrificed a soldier for " + task.card.name, "Close");
            Game.sacrificeCrew(task);
        };
        $scope.useTreasure = function(id, task = null) {
            let treasure = Game.getTreasure(id);
            Game.useTreasure(treasure, task);
        };
        $scope.ignoreCurrent = function(task) {
            Game.ignoreCurrent(task);
        };
        $scope.resolveTask = function(task) {
            Game.Taskresolver.init(task);
            Game.Statemanager.showPartial("quest", "result");
        };
        $scope.endTurn = function() {
            if (Game.isAllTaskResolved()) {
                endTurnProcess();
            }
            else {
                Game.Statemanager.MessageBox.show(function(btnId) {
                    if (btnId == 2) { endTurnProcess(); }
                },
                "End of Turn", "Are you sure?<br/>There are some unsolved task.<br/>The unsolved task will be failed!", "No", "Yes");
            }
        };
        $scope.giveUp = function() {
            Game.Statemanager.MessageBox.show(function(btnId) {
                if (btnId == 2) {
                    Game.giveUpQuest();
                    Store.save(Game.getDataForSave());
                    Game.Statemanager.show("main");
                }
            },
            "Give up quest", "Are you sure you want to end the quest?", "No", "Yes");
        };
        $scope.showTreasure = function(card) {
            let usableLabel = card.hasTag("global_effect") ? "Use": "";
            Game.Statemanager.MessageBox.show(function(btnId) {
                if (btnId == 2) { Game.useTreasure(card); }
            },
            card.name, card.desc, "Close", usableLabel);
        };

        let endTurnProcess = function() {
            Game.endTurn();
            if (Game.questStatus == Game.RESULT_NONE) {
                Game.startTurn();
            }
            else {
                Game.Statemanager.showPartial("quest", "end");
            }
        }
    }
]);

app.controller('TaskresultController', ['$scope', 'Game',
    function($scope, Game) {

        let update = function() {
            $scope.task = Game.Taskresolver.task;
            $scope.cardname = Game.Taskresolver.task.card.name;
            $scope.carddesc = Game.Taskresolver.task.card.desc;
            $scope.soldiers = Game.Taskresolver.task.assignedSoldiers;
            $scope.roll = Game.Taskresolver.roll;
            $scope.bonus = Game.Taskresolver.getAttackBonus();
            $scope.attackValue = Game.Taskresolver.attackValue;
            $scope.difficult = Game.Taskresolver.difficult;
            $scope.damage = Game.Taskresolver.task.card.damage;
            $scope.isWin = (Game.Taskresolver.result == Game.RESULT_WIN);
            $scope.isLose = (Game.Taskresolver.result == Game.RESULT_LOSE);

            $scope.canReroll = Game.resolveReroll;
            $scope.ignoreDamage = Game.hasTreasure("aegis_of_zeus");       
        };

        update();

        $scope.reroll = function() {
            Game.Taskresolver.reroll();
            update();
        };
        $scope.cancelDamage = function() {
            Game.Taskresolver.cancelDamage();
            Game.Statemanager.showPartial("quest", "list");
        };
        $scope.close = function() {
            //  a megoldas eredmenyenek vegrehajtasa
            Game.Taskresolver.process();
            Game.Statemanager.showPartial("quest", "list");
        }
    }
]);

app.controller('QuestEndController', ['$scope', 'Game', 'Store',
    function($scope, Game, Store) {

        $scope.isWin = (Game.questStatus == Game.RESULT_WIN);
        $scope.defeatedCards = Game.victoryPile;
        $scope.xp = Game.questResult.xp;
        $scope.hasOrpheuslyre = Game.questResult.orpheuslyreDefeated;

        if (Game.questStatus == Game.RESULT_WIN) {
            $scope.endText = "The quest has been succes!";
        } 
        else $scope.endText = "The quest has been failed!";

        $scope.selection = {};
        $scope.selection.card = null;

        $scope.close = function() {
            Game.endQuest($scope.selection.card);
            Store.save(Game.getDataForSave());
            Game.Statemanager.show("main");
        }
    }
]);

app.controller('QuestWinController', ['$scope', 'Game',
    function($scope, Game) {

        $scope.close = function() {
            Game.Statemanager.show("main");
        }
    }
]);

app.controller('QuestLoseController', ['$scope', 'Game',
    function($scope, Game) {

        $scope.close = function() {
            Game.Statemanager.show("main");
        }
    }
]);

app.controller('MessageBoxController', ['$scope', 'Game',
    function($scope, Game) {

        $scope.title = Game.Statemanager.MessageBox.title;
        $scope.content = Game.Statemanager.MessageBox.content;
        $scope.buttonLabel1 = Game.Statemanager.MessageBox.buttonLabel1;
        $scope.button2Visible = (Game.Statemanager.MessageBox.buttonLabel2) ? true: false;
        $scope.buttonLabel2 = Game.Statemanager.MessageBox.buttonLabel2;
        $scope.button3Visible = (Game.Statemanager.MessageBox.buttonLabel3) ? true: false;
        $scope.buttonLabel3 = Game.Statemanager.MessageBox.buttonLabel3;

        $scope.handleButton = function(result) {
            Game.Statemanager.MessageBox.hide();
            if (Game.Statemanager.MessageBox.callback !== null) Game.Statemanager.MessageBox.callback(result);
        }
    }
]);
