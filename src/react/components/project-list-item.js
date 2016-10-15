import React from 'react';

export default class ProjectListItem extends React.Component {

    render() {
        var data = this.props.data;
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.google_doc_id}</td>
                <td>{data.section}</td>
                <td>{data.created_at}</td>
                <td>{data.updated_at}</td>
            </tr>
        );
    }

}
