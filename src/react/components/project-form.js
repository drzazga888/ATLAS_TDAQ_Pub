import React from 'react';
import $ from 'jquery';
import config from '../config';
import ErrorItem from './error-item';

export default class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            google_doc_id: '',
            google_doc_name: 'none',
            section: '',
            pickerLoaded: false,
            requestSent: false // TODO add support
        };
        this.serverRequest = null;
        this.changeName = this.changeName.bind(this);
        this.changeSection = this.changeSection.bind(this);
        this.createProject = this.createProject.bind(this);
        this.showDocsPicker = this.showDocsPicker.bind(this);
    }

    createProject () {
        this.setState({
            requestSent: true
        });
        this.serverRequest = $.ajax({
            url: this.props.url,
            dataType: 'json',
            data: {
                name: this.state.name,
                google_doc_id: this.state.google_doc_id,
                section: this.state.section
            },
            method: 'POST',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', config.tokens.id);
            }
        }).done(function(data) {
            console.log(data);
        }.bind(this)).always(function() {
            this.setState({
                requestSent: false
            });
        }.bind(this));
    }

    componentDidMount() {
        var reactThis = this;
        gapi.load('picker', function() {
            reactThis.setState({
                pickerLoaded: true
            });
        });
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    showDocsPicker() {
        var reactThis = this;
        if (this.state.pickerLoaded && config.tokens.access) {
            new google.picker.PickerBuilder()
                .addView(google.picker.ViewId.DOCUMENTS)
                .setOAuthToken(config.tokens.access)
                .setDeveloperKey(config.keys.api)
                .setCallback(function(data) {
                    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                        var doc = data[google.picker.Response.DOCUMENTS][0];
                        reactThis.setState({
                            google_doc_id: doc[google.picker.Document.ID],
                            google_doc_name: doc[google.picker.Document.NAME]
                        });
                    }
                })
                .build()
                .setVisible(true);
        }
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    changeSection(e) {
        this.setState({
            section: e.target.value
        });
    }

    validate() {
        var errors = [];
        if (!this.state.name.length) {
            errors.push({
                id: 1,
                message: 'Field "Project name" must be filled'
            });
        }
        if (!this.state.google_doc_id) {
            errors.push({
                id: 2,
                message: 'Field "Google Doc template"'
            });
        }
        if (!this.state.section) {
            errors.push({
                id: 3,
                message: 'Field "Document section" must be filled. Also only number values are supported'
            });
        }
        return errors;
    }

    render() {
        var errors = this.validate().map(function(error) {
            return <ErrorItem key={error.id} message={error.message} />;
        });
        var invalid = errors.length !== 0;
        return (
            <div className="project-form">
                <div className="inputs">
                    <p>
                        Project name
                        <input required type="text" value={this.state.name} onChange={this.changeName} placeholder="Enter the name of project"/>
                    </p>
                    <p>
                        Google Doc template: <em>{this.state.google_doc_name}</em>
                        <button onClick={this.showDocsPicker}>Select Google Document</button>
                        <input required type="hidden" value={this.state.google_doc_id} />
                    </p>
                    <p>
                        Document section
                        <input required type="number" value={this.state.section} onChange={this.changeSection} placeholder="Specify section of the document" />
                    </p>
                    <p>
                        <button onClick={this.createProject} disabled={invalid || this.state.requestSent}>Create</button>
                        {this.state.requestSent ? <span>Waiting for response</span> : null}
                    </p>
                </div>
                <div className="errors">
                    {errors}
                </div>
            </div>
        );
    }

}
