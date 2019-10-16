import React, { Component } from 'react';
import AuthServices from '../../Services/Services'

const list = [
    { name: 'All' },
    { name: 'Nintendo Fanicom NES' },
    { name: 'Super Nintendo SNES' },
    { name: 'Nintendo 64' },
    { name: 'Game Cube' },
    { name: 'Wii' },
    { name: 'Wii U' },
    { name: 'Nintendo Switch' },
    { name: 'Game Boy' },
    { name: 'Game Boy Advance' },
    { name: 'Nintendo DS' },
    { name: 'Playstation' },
    { name: 'Playstation 2' },
    { name: 'Playstation 3' },
    { name: 'Playstation 4' },
    { name: 'PSP' },
    { name: 'PSP Vita' },
    { name: 'XBox' },
    { name: 'XBox 360' },
    { name: 'XBox One' },
];

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}
    </div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map(el => {
        const {name} = el;

        return <MenuItem text={name} key={name} selected={selected} />;
    });


const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'All';

export default class FilterProducts extends Component {
    constructor(props) {
        super(props);
        this.menuItems = Menu(list, selected);
        this.service = new AuthServices();
    }

    state = {
        selected
    };

    onSelect = (value) => {
        this.setState({filterCategory: value})
        this.props.filterProducts(value)
    };

    render(){
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;

        return (
            <div className="App">
                < scrollmenu
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    selected={selected}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}