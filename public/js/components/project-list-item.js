import React from 'react';

export default class ProjectListItem extends React.Component {

    render() {
        return (
            <div>
                <p>#{this.props.data.id} {this.props.data.name}</p>
                <p>Resource: #{this.props.data.google_doc} from {this.props.data.section}</p>
                <p>Updated at {this.props.data.updated_at}</p>
                <p>Created at {this.props.data.created_at}</p>
            </div>
        );
    }

}
