export default function initialRows() {
    let rows = Array(8).fill({columns: Array(8).fill({piece: ''})});
    return rows;
}