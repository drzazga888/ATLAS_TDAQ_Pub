import React from 'react';
import $ from 'jquery';

export default class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            google_doc: '',
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
                            google_doc: doc[google.picker.Document.ID]
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
                        <input type="text" value={this.state.name} placeholder="Enter the name of project"/>
                    </p>
                    <p>
                        Google Doc template: <em>{this.state.google_doc}</em>
                        <button onClick={this.showDocsPicker.bind(this)}>Select Google Document</button>
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
