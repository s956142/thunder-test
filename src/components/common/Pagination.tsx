import React from 'react';

type propsType = {
    size: number
    index: number;
    onPress: (index: number) => void
}
const getPageArray = (page: number) => {
    let result: string[] = []
    for (let i = 0; i < page; i++)
        result.push(i + 1 + '')
    return result
}
const NumberBox = ({ num, isActive, onPress, }: { num: string, isActive: boolean, onPress: (index: number) => void }) => {
    const index = Number(num) - 1
    return (<div className={`number-box ${isActive ? 'active' : ''}`} onClick={() => onPress(index)}>
        {num}
    </div>)
}
const Pagination = (props: propsType) => {
    const pagination = getPageArray(props.size)
    return (
        <div className="pageination-bar">
            <div className="number-box left" onClick={() => props.onPress(props.index < 1 ? 0 : props.index - 1)}>{`<`}</div>
            {pagination.map((x, i) => (
                <NumberBox num={x} isActive={i === props.index} onPress={props.onPress} key={`numbertBox_${i}`} />
            ))

            }
            <div className="number-box right" onClick={() => props.onPress(props.index+1 >= props.size ? props.size-1 : props.index+1)}>{`>`}</div>
        </div>
    );
};

export default Pagination