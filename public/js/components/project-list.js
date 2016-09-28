import React from 'react';
import $ from 'jquery';
import ProjectListItem from './project-list';

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            message: null
        };
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({message: "Loading..."});
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data, message: null});
                }.bind(this),
                beforeSend: function(xhr){
                    xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                }
            });
        } else {
            this.setState({message: "You are not logged in."});
        }
    }

    render() {
        var itemNodes = this.state.data.map(function(item) {
            return <ProjectListItem key={item.id} name={item.name} />;
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
                    <p className="message">{this.state.message}</p>
                </footer>
            </div>
        );
    }

}
