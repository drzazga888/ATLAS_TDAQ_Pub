import React from 'react';
import $ from 'jquery';

export default class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            google_doc: '',
            section: ''
        };
    }

    testGoogle () {
        this.serverRequest = $.ajax({
            url: this.props.docsUrl,
            dataType: 'json',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    render() {
        return (
            <div className="block">
                <header>
                    <h2>Create new project</h2>
                </header>
                <section>
                    <p>
                        <input type="text" value={this.state.name} placeholder="Enter the name of project"/>
                    </p>
                    <p>
                        <input type="text" value={this.state.google_doc} placeholder="Chose the Google Doc template" />
                    </p>
                    <p>
                        <input type="number" value={this.state.section} placeholder="Specify section of the document" />
                    </p>
                    <p>
                        <button onClick={this.testGoogle.bind(this)}>Create</button>
                    </p>
                </section>
            </div>
        );
    }

}
