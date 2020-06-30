class Operations {
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
}
export default Operations;
//# sourceMappingURL=operations.js.map