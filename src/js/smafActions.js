// Set all action callbacks
export default {
    // Set the arrows/enter callbacks
    'LEFT': navigationGoLeft,
    'RIGHT': navigationGoRight,
    'UP': navigationGoUp,
    'DOWN': navigationGoDown,
    'ENTER': navigationEnter,
    'RED': playEasy,
    'GREEN': playNormal
};


function navigationGoLeft() {
    let selectedIndex = this.state.selectedIndex > 0
        ? this.state.selectedIndex - 1
        : this.state.selectedIndex + 14;

    this.setState({selectedIndex: selectedIndex});

    if (this.state.positions[this.state.selectedIndex] === 0) {
        navigationGoLeft.call(this);
    }
}


function navigationGoRight() {
    let selectedIndex = (this.state.selectedIndex + 1) % 16;

    this.setState({selectedIndex: selectedIndex});

    if (this.state.positions[this.state.selectedIndex] === 0) {
        navigationGoRight.call(this);
    }
}


function navigationGoUp() {
    let selectedIndex = this.state.selectedIndex > 3
        ? this.state.selectedIndex - 4
        : this.state.selectedIndex + 12;

    this.setState({selectedIndex: selectedIndex});

    if (this.state.positions[this.state.selectedIndex] === 0) {
        navigationGoUp.call(this);
    }
}


function navigationGoDown() {
    let selectedIndex = (this.state.selectedIndex + 4) % 16;

    this.setState({selectedIndex: selectedIndex});

    if (this.state.positions[this.state.selectedIndex] === 0) {
        navigationGoDown.call(this);
    }
}


function navigationEnter() {
    let key = this.state.positions[this.state.selectedIndex];
    this.updatePosition(key);
}


function playEasy() {
    this.setState({
        positions: this.shufflePositions('modeEasy'),
        win: false
    });
}


function playNormal() {
    this.setState({
        positions: this.shufflePositions('modeNormal'),
        win: false
    });
}
