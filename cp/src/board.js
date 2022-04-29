const Board = ({rows=[]}) => {
    return (
        <div>
            <table className="Board">
                <tbody>
                    {rows.map((row, rindex) => (
                        <tr key={`row${rindex}`}>
                            {row.columns.map((column, cindex) => (
                                <td key={`row${rindex}col${cindex}`}
                                    square-color=
                                    {(rindex % 2 === 0 && cindex % 2 === 0) ||
                                     (rindex % 2 === 1 && cindex % 2 === 1)
                                     ? 'white' : 'black'
                                    }
                                    piece={column.piece}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Board;