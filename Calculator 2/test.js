System.register(["./main"], function (exports_1, context_1) {
    "use strict";
    var main_1, c;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (main_1_1) {
                main_1 = main_1_1;
            }
        ],
        execute: function () {
            c = new main_1.Calculator();
            main_1.test(c, "1+2*33/11=");
            console.log(main_1.test);
        }
    };
});
//# sourceMappingURL=test.js.map