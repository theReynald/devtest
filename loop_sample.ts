// Simple TypeScript loop samples
// Run with: npx ts-node loop_sample.ts

function sumEditsForLoop(): void {
    const edits: number[] = [0, 1, 2, 3, 4];
    let total = 0;

    for (let i = 0; i < edits.length; i++) {
        total += edits[i];
        console.log(`edit=${edits[i]}`);
    }

    console.log(`sum(edits)=${total}`);
}

function countdownWhileLoop(start: number): void {
    let current = start;

    while (current >= 0) {
        console.log(`countdown=${current}`);
        current--;
    }

    console.log('countdown complete');
}

function main(): void {
    sumEditsForLoop();
    countdownWhileLoop(5);
}

main();
