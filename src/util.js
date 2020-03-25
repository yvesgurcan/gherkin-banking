export function generateRandomNumber(length) {
    const max = Number('9'.repeat(length));
    const min = Number('1' + '0'.repeat(length - 1));
    const numberWithinRange = Math.floor(Math.random() * (max - min) + min);
    return numberWithinRange;
}
