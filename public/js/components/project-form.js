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
        this.picker = null;
    }

    componentDidMount() {
        var reactThis = this;
        $(document).on('google-apis-loaded', function() {
            gapi.load('picker', function() {
                var view = new google.picker.View(google.picker.ViewId.DOCS);
                view.setMimeTypes("image/png,image/jpeg,image/jpg");
                reactThis.picker = new google.picker.PickerBuilder()
                    .enableFeature(google.picker.Feature.NAV_HIDDEN)
                    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                    .setAppId(reactThis.props.client)
                    .setOAuthToken(localStorage.getItem('token'))
                    .addView(view)
                    .addView(new google.picker.DocsUploadView())
                    .setDeveloperKey(reactThis.props.apiKey)
                    .setCallback(function() {
                        console.log('done');
                    })
                    .build();
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
        this.picker.setVisible(true);
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
