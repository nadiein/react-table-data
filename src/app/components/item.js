import React, { Component, PropTypes } from 'react';

export default class Item extends Component {

    render() {
        const { item } = this.props;

        return (
            <span>{item._id}</span>
        );
    }
}
