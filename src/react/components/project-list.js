import React from 'react';
import $ from 'jquery';
import ProjectListItem from './project-list-item';
import config from '../config';

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var itemNodes = this.state.data.map(function(item) {
            return <ProjectListItem key={item.id} data={item} />;
        });
        return (
            <div className="project-list">
                {
                    itemNodes.length > 0
                    ? <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Template</th>
                                <th>Section</th>
                                <th>Created at</th>
                                <th>Updated at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemNodes}
                        </tbody>
                    </table>
                    : <p>Project list is empty</p>
                }
            </div>
        );
    }

}
