import React from 'react';
import {shuffle, range} from 'lodash';
import {Motion, spring} from 'react-motion';

var cellSizeX = 273;
var cellSizeY = 182;
let cellMarginLeft = 2;
let cellMarginTop = 2;

const layout = range(0, 16).map(n => {
    const row = Math.floor(n / 4);
    const col = n % 4;
    return [(cellSizeX + 2 * cellMarginLeft) * col, (cellSizeY + 2 * cellMarginTop) * row];
});

const layoutWin = range(0, 16).map(n => {
    const row = Math.floor(n / 4);
    const col = n % 4;
    return [cellSizeX * col, cellSizeY * row];
});

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            positions: this.shufflePositions('modeEasy'),
            selectedIndex: 0,
            win: false
        };
    }

    updatePosition(index) {
        let arr = this.state.positions;
        let emptyIndex = arr.indexOf(0);
        let targetIndex = arr.indexOf(index);
        const dif = Math.abs(targetIndex - emptyIndex);
        if (dif == 1 || dif == 4) {
            arr[emptyIndex] = index;
            arr[targetIndex] = 0;
            this.setState({
                positions: arr,
                selectedIndex: emptyIndex
            });

            let win = (arr[15] == 0) && arr.reduce(function (prev, cur, index) {
                    return (index === 14 || index === 15) ? prev : prev && cur <= arr[index + 1]
                }, true);
            this.setState({win});
        }
    }

    shufflePositions(mode) {
        return mode === "modeEasy"
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 14, 15]
            : shuffle(range(0, 16));
    }

    render() {
        return (<div className="game"
                     style={{width: (cellSizeX + 2 * cellMarginLeft) * 4, height: (cellSizeY + 2 * cellMarginTop) * 4}}>
            {this.state.positions.map((i, key)=> {
                let cellId = this.state.win ? '' : key;
                let marginLeft = this.state.win ? 0 : cellMarginLeft;
                let marginTop = this.state.win ? 0 : cellMarginTop;
                let isActiveCell = this.state.positions.indexOf(key) === this.state.selectedIndex;
                let [x, y] = this.state.win ? layoutWin[this.state.positions.indexOf(key)] : layout[this.state.positions.indexOf(key)];
                let style = {
                    tX: spring(x),
                    tY: spring(y)
                };
                return <Motion style={style} key={key}>
                    {({ tX, tY }) =>
                        <div className={key && isActiveCell ? 'cell active': 'cell'}
                             onClick={() => this.updatePosition(key)}
                             style={{left:tX, top: tY, width: cellSizeX + 2 * marginLeft, height: cellSizeY + 2 * marginTop}}
                        >
                            {(key || this.state.win) ? <div>
                                <div
                                    style={{marginLeft: marginLeft, marginTop: marginTop, backgroundImage:'url(./img/photo.jpg)', backgroundPosition:`${-(((key-1) % 4) * cellSizeX)}px ${-(Math.floor((key-1) / 4) * cellSizeY)}px`, width: cellSizeX, height: cellSizeY}}>
                                </div>
                                    <span style={{position: 'absolute', left: 6, top: 6}}>
                                        {cellId}
                                    </span>
                            </div>
                                : null
                            }
                        </div>
                    }
                </Motion>
            })}
        </div>)
    }
}
