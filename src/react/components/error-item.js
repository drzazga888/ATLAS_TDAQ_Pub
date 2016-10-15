import React from 'react';

export default class ErrorItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p className="error-item description icon-attention">
                {this.props.message}
            </p>
        );
    }

}