// Google Cloud Functions version
// Install with: npm install @google-cloud/functions-framework
// Deploy with: gcloud functions deploy loopSample --runtime nodejs18 --trigger-http --allow-unauthenticated

interface Request {
    query: any;
    body?: any;
}

interface Response {
    status: (code: number) => Response;
    json: (data: any) => void;
}

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

// Google Cloud Functions HTTP handler
export const loopSample = (req: Request, res: Response) => {
    console.log('Cloud Function invoked');
    
    const operation = req.query.operation || req.body?.operation || 'both';
    const start = req.query.start || req.body?.start || 5;
    
    const result: any = {};

    if (operation === 'sum' || operation === 'both') {
        result.sumOperation = sumEditsForLoop();
    }

    if (operation === 'countdown' || operation === 'both') {
        const startNum = typeof start === 'string' ? parseInt(start, 10) : start;
        const validStart = !isNaN(startNum) ? startNum : 5;
        result.countdownOperation = countdownWhileLoop(validStart);
    }

    res.status(200).json({
        message: 'Loop operations completed successfully',
        results: result
    });
};
