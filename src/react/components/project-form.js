import React from 'react';
import $ from 'jquery';

export default class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            google_doc: '',
            google_doc_name: 'none',
            section: '',
            loaded: false
        };
        this.loaded = false;
        this.picker = null;
    }

    componentDidMount() {
        var reactThis = this;
        $(document).on('google-apis-loaded', function() {
            gapi.load('picker', function() {
                reactThis.setState({
                    loaded: true
                });
            });
        });
    }

    createProject () {
        this.serverRequest = $.ajax({
            url: this.props.url,
            dataType: 'json',
            data: {
                name: this.props.name,
                google_doc: this.props.google_doc,
                section: this.props.section
            },
            method: 'POST',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('id_token'));
            },
            success: function(data) {
                console.log(data);
            }.bind(this)
        });
    }

    showDocsPicker() {
        var reactThis = this;
        if (localStorage.getItem('access_token') && this.state.loaded) {
            this.picker = new google.picker.PickerBuilder()
                .addView(google.picker.ViewId.DOCUMENTS)
                .setOAuthToken(localStorage.getItem('access_token'))
                .setDeveloperKey(this.props.apiKey)
                .setCallback(function(data) {
                    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                        var doc = data[google.picker.Response.DOCUMENTS][0];
                        reactThis.setState({
                            google_doc: doc[google.picker.Document.ID],
                            google_doc_name: doc[google.picker.Document.NAME]
                        });
                    }
                })
                .build();
            this.picker.setVisible(true);
        }
    }

    render() {
        return (
            <div className="block">
                <header>
                    <h2>Create new project</h2>
                </header>
                <section>
                    <p>
                        Project name
                        <input type="text" value={this.state.name} placeholder="Enter the name of project"/>
                    </p>
                    <p data-id={this.state.google_doc}>
                        Google Doc template: <em>{this.state.google_doc_name}</em>
                        <button onClick={this.showDocsPicker.bind(this)}>Select Google Document</button>
                    </p>
                    <p>
                        Document section
                        <input type="number" value={this.state.section} placeholder="Specify section of the document" />
                    </p>
                    <p>
                        <button onClick={this.createProject.bind(this)}>Create</button>
                    </p>
                </section>
            </div>
        );
    }

}
