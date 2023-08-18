import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllChits } from "../../store/chits";


function ChitIndex () {
    const dispatch = useDispatch();
    const chits = useSelector(state => {
        return Object.values(state.chits)
    });

    useEffect(() => {
        dispatch(fetchAllChits())
    }, dispatch)

    return (
        <div>
            <h4>Chits Index</h4>
            <ul>
                {chits.map(chit => {
                    return <p>{chit.body}</p>
                })}
            </ul>
        </div>
    )
}

export default ChitIndex;