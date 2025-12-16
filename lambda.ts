// Cloud-ready AWS Lambda version
// Deploy this to AWS Lambda for serverless execution

export interface LambdaEvent {
    operation?: 'sum' | 'countdown' | 'both';
    start?: number;
}

export interface LambdaResponse {
    statusCode: number;
    body: string;
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

// AWS Lambda handler
export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
    console.log('Lambda invoked with event:', JSON.stringify(event));
    
    const operation = event.operation || 'both';
    const result: any = {};

    if (operation === 'sum' || operation === 'both') {
        result.sumOperation = sumEditsForLoop();
    }

    if (operation === 'countdown' || operation === 'both') {
        const start = event.start !== undefined ? event.start : 5;
        const startNum = typeof start === 'string' ? parseInt(start, 10) : start;
        const validStart = !isNaN(startNum) ? startNum : 5;
        result.countdownOperation = countdownWhileLoop(validStart);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Loop operations completed successfully',
            results: result
        }, null, 2)
    };
}
