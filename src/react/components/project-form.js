import React from 'react';
import $ from 'jquery';
import config from '../config';
import ErrorItem from './error-item';

export default class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            doc_id: '',
            doc_name: '',
        };
    }

    render() {
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
