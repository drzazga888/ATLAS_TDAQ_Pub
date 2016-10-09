import React from 'react';

export default class ProjectListItem extends React.Component {

    render() {
        return (
            <pre>{JSON.stringify(this.props.data)}</pre>
        );
    }

}
