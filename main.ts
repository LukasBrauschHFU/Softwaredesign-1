import Operations from "./operations"
class Program {

    static Main(args: string[]) {
        console.log("Welcome to the Calculator. Start entering calculations!");
        for (
            ; ;
        ) {
            console.log("> ");
            let command: string = console.readLine;
            if ((command.ToLower() == "exit")) {
                break;
            }

            let left: number = 0;
            let right: number = 0;
            let opInx: number = Program.FindFirstNonDigit(command);
            if ((opInx < 0)) {
                console.log("No operator specified");
            }

            let operatorSymbol: string = command[opInx];
            try {
                left = parseFloat(command.substring(0, opInx));
                right = parseFloat(command.substring((opInx + 1)));
            }
            catch ( /*:Exception*/) {
                console.log("Error parsing commmand");
            }

            console.log("Calculating {left} {opSymbol} {right}...");
            //  TODO: Perform calculation here.
        }

    }

    private static FindFirstNonDigit(s: string): number {
        for (let i: number = 0; (i < s.length); i++) {
            if (!s.charAt[i].IsDigit) {
                return i;
            }

        }

        return -1;
    }
}
 
