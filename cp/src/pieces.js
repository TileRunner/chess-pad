const Pieces = () => {
    return (
        <div>
            <table className="piece">
                <tbody>
                <tr>
                    <td piece='white-rook'></td>
                    <td piece='black-rook'></td>
                </tr>
                    <tr>
                        <td piece='white-knight'></td>
                        <td piece='black-knight'></td>
                    </tr>
                    <tr>
                        <td piece='white-bishop'></td>
                        <td piece='black-bishop'></td>
                    </tr>
                    <tr>
                        <td piece='white-queen'></td>
                        <td piece='black-queen'></td>
                    </tr>
                    <tr>
                        <td piece='white-king'></td>
                        <td piece='black-king'></td>
                    </tr>
                    <tr>
                        <td piece='white-pawn'></td>
                        <td piece='black-pawn'></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default Pieces;
