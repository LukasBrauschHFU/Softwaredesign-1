System.register([], function (exports_1, context_1) {
    "use strict";
    var Operations;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Operations = class Operations {
                static Power(a, exp) {
                    let result = 1;
                    for (let i = 0; (i < exp); i++) {
                        result = (result * a);
                    }
                    return result;
                }
                static GreatestCommonDenominator(a, b) {
                    if ((a < b)) {
                        let tmp = a;
                        a = b;
                        b = tmp;
                    }
                    while ((b > 0)) {
                        let c = (a % b);
                        a = b;
                        b = c;
                    }
                    return a;
                }
            };
            exports_1("default", Operations);
        }
    };
});
//# sourceMappingURL=operations.js.map