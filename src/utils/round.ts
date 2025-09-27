export default function round(value: number, decimals: number) {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}