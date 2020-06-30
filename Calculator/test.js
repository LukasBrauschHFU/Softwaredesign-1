System.register(["./modules/main.js"], function (exports_1, context_1) {
    "use strict";
    var main_js_1, c;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (main_js_1_1) {
                main_js_1 = main_js_1_1;
            }
        ],
        execute: function () {
            c = new main_js_1.Calculator();
            main_js_1.test(c, "1+2*33/11=");
            console.log(main_js_1.test);
        }
    };
});
//# sourceMappingURL=test.js.map