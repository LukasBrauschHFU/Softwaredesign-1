class Operations {
    
        public static Power(a: number, exp: number): number {
            let result: number = 1;
            for (let i: number = 0; (i < exp); i++) {
                result = (result * a);
            }
            
            return result;
        }
        
        public static GreatestCommonDenominator(a: number, b: number): number {
            if ((a < b)) {
                let tmp: number = a;
                a = b;
                b = tmp;
            }
            
            while ((b > 0)) {
                let c: number = (a % b);
                a = b;
                b = c;
            }
            
            return a;
        }
    }
    export default Operations;