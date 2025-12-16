// Azure Functions version
// Install with: npm install @azure/functions
// Deploy with: func azure functionapp publish <YOUR_FUNCTION_APP_NAME>

interface Context {
    log: (message: string) => void;
    res?: {
        status: number;
        body: any;
    };
}

interface HttpRequest {
    query: any;
    body?: any;
}

type AzureFunction = (context: Context, req: HttpRequest) => Promise<void>;

function sumEditsForLoop(): { edits: number[], total: number, logs: string[] } {
    const edits: number[] = [0, 1, 2, 3, 4];
    let total = 0;
    const logs: string[] = [];

    for (let i = 0; i < edits.length; i++) {
        total += edits[i];
        logs.push(`edit=${edits[i]}`);
    }

    logs.push(`sum(edits)=${total}`);
    
    return { edits, total, logs };
}

function countdownWhileLoop(start: number): { start: number, logs: string[] } {
    let current = start;
    const logs: string[] = [];

    while (current >= 0) {
        logs.push(`countdown=${current}`);
        current--;
    }

    logs.push('countdown complete');
    
    return { start, logs };
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Azure Function HTTP trigger processed a request.');

    const operation = req.query.operation || (req.body && req.body.operation) || 'both';
    const start = req.query.start || (req.body && req.body.start) || 5;
    
    const result: any = {};

    if (operation === 'sum' || operation === 'both') {
        result.sumOperation = sumEditsForLoop();
    }

    if (operation === 'countdown' || operation === 'both') {
        const startNum = typeof start === 'string' ? parseInt(start, 10) : start;
        const validStart = !isNaN(startNum) ? startNum : 5;
        result.countdownOperation = countdownWhileLoop(validStart);
    }

    context.res = {
        status: 200,
        body: {
            message: 'Loop operations completed successfully',
            results: result
        }
    };
};

export default httpTrigger;
