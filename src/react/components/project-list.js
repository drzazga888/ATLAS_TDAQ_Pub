import React from 'react';
import $ from 'jquery';
import ProjectListItem from './project-list-item';
import config from '../config';

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.serverRequest = null;
        this.state = {
            data: [],
            status: 'loading'
        };
    }

    getProjects() {
        this.abortRequest();
        this.serverRequest = $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', config.tokens.id);
            },
            success: function (data) {
                this.setState({
                    data: data,
                    status: 'fetched'
                });
            }.bind(this)
        });
    }

    abortRequest() {
        if (this.serverRequest) {
            this.serverRequest.abort();
            this.serverRequest = null;
        }
    }

    componentDidMount() {
        switch (config.tokens.id) {
            case undefined:
                break;
            case null:
                this.setState({
                    status: 'not-logged-in'
                });
                break;
            default:
                this.getProjects();
        }
        $(document).on('auth-granted', function() {
            this.setState({
                status: 'loading'
            });
            this.getProjects();
        }.bind(this));
        $(document).on('auth-revoked', function() {
            this.setState({
                status: 'not-logged-in',
                data: []
            });
        }.bind(this));
    }

    componentWillUnmount() {
        this.abortRequest();
    }

    render() {
        var itemNodes = this.state.data.map(function(item) {
            return <ProjectListItem key={item.id} data={item} />;
        });
        var message;
        var classes = 'description';
        switch (this.state.status) {
            case 'loading':
                message = 'Loading...';
                classes += ' icon-attention';
                break;
            case 'not-logged-in':
                message = 'You have to be logged in';
                classes += ' icon-attention';
                break;
            case 'fetched':
                message = '';
        }
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
                    : null
                }
                <p className={classes}>{message}</p>
            </div>
        );
    }

}
