import React from 'react';
import $ from 'jquery';
import ProjectListItem from './project-list-item';

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            data: [],
            message: 'Please log in to application'
        };
        this.state = this.initialState;
    }

    getProjects() {
        this.serverRequest = $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                this.setState({
                    data: data,
                    message: null
                });
            }.bind(this)
        });
    }

    componentDidMount() {
        $(document).on('google-logged-in', this.getProjects.bind(this));
        $(document).on('google-logged-out', function() {
            this.setState(this.initialState)
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        var itemNodes = this.state.data.map(function(item) {
            return <ProjectListItem key={item.id} data={item} />;
        });
        return (
            <div className="block">
                <header>
                    <h2>Project list</h2>
                </header>
                <section>
                    {itemNodes}
                </section>
                <footer>
                    {this.state.message ? <p className="description icon-attention">{this.state.message}</p> : null}
                </footer>
            </div>
        );
    }

}
