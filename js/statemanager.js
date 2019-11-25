Game.Statemanager = {
    states: {
        // modalWindow: false,
        _messageBox: false,

        menuscreen: false,
        main: false,
        heroicdeeds: false,

        quest: false,
        quest_list: false,
        quest_result: false,
        quest_end: false,
        quest_win: false,
        quest_lose: false,

        // taskresult: false,
        // questwin: false,
        // questlose: false,
    },



    startState: "",
    prevWindow: "",
    actualWindow: "",

    inputBlocked: false,
    menuDisabled: false,
 
    modalService: {
        visible: false,
        prevWindow: "",
        menuState: false,
        callback: null,
        msg1: "nincs"
    },
    MessageBox: {
        Button_1: 1,
        Button_2: 2,
        Button_3: 3,
        title: "MessageBox",
        content: "",
        callback: null,
        buttonLabel1: "",
        buttonLabel2: "",
        buttonLabel3: "",
        //  ha a buttonLabel ures, akkor nem is jelenik meg
        show: function(callback, title, content, buttonLabel1, buttonLabel2 = "", buttonLabel3 = "") {
            this.callback = callback;
            this.title = title;
            this.content = content;
            this.buttonLabel1 = buttonLabel1;
            this.buttonLabel2 = buttonLabel2;
            this.buttonLabel3 = buttonLabel3;

            // Game.Statemanager.MessageBox.prevWindow = Game.Statemanager.actualWindow;
            // Game.Statemanager.MessageBox.menuState = Game.Statemanager.menuDisabled;
            // Game.Statemanager.menuDisabled = true;
            // Game.Statemanager.hideAll();
            Game.Statemanager.states._messageBox = true;
        },
        hide: function() {
            // Game.Statemanager.menuDisabled = Game.Statemanager.MessageBox.menuState;
            Game.Statemanager.states._messageBox = false;
            // Game.Statemanager.states[Game.Statemanager.actualWindow] = true;
        }
    },

    show: function(newName, prevWindow = "") {
        Game.Statemanager.prevWindow = prevWindow;

        Game.Statemanager.hideAll();

        Game.Statemanager.actualWindow = newName;
        Game.Statemanager.states[newName] = true;
    },
    //  olyan, mint a show, de letiltja a menut
    showModal: function(newName, prevWindow = "") {
        Game.Statemanager.menuDisabled = true;
        Game.Statemanager.show(newName, prevWindow);
    },
    close: function() {
        if (Game.Statemanager.prevWindow) {
            Game.Statemanager.show(Game.Statemanager.prevWindow);
        }
        else Game.Statemanager.show(Game.Statemanager.startState);
    },
    reload: function() {
        Game.Statemanager.show(Game.Statemanager.actualWindow, Game.Statemanager.prevWindow);
    },

    showPartial: function(viewName, subView) {
        if ( !Game.Statemanager.states[viewName]) Game.Statemanager.show(viewName, this.prevWindow);
        Game.Statemanager.hideAllPartial(viewName);
        Game.Statemanager.states[viewName + "_" + subView] = true;
    },
    
    showModalMessage: function(callback = null) {
        Game.Statemanager.modalService.callback = callback;
        Game.Statemanager.modalService.prevWindow = Game.Statemanager.actualWindow;
        Game.Statemanager.modalService.menuState = Game.Statemanager.menuDisabled;
        Game.Statemanager.menuDisabled = true;
        Game.Statemanager.hideAll();
        Game.Statemanager.modalService.visible = true;
        Game.Statemanager.states.modalWindow = true;
    },
    hideModalMessage: function() {
        Game.Statemanager.menuDisabled = Game.Statemanager.modalService.menuState;
        Game.Statemanager.modalService.visible = false;
        Game.Statemanager.states.modalWindow = false;
        Game.Statemanager.states[Game.Statemanager.actualWindow] = true;
    },

    back: function() {
        if (Game.Statemanager.prevWindow) {
            Game.Statemanager.show(Game.Statemanager.prevWindow);
        }
        else Game.Statemanager.show(Game.Statemanager.startState);
    },

    hideAll: function() {
        for(let id in this.states) {
            Game.Statemanager.states[id] = false;
        }
        Game.Statemanager.modalService.visible = false;
    },
    hideAllPartial: function(viewName) {
        for(let id in this.states) {
            if (id.startsWith(viewName + "_")) { this.states[id] = false; }
        }
    }

};