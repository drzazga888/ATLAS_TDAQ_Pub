import React from 'react';
import ProjectList from './project-list';
import ProjectForm from './project-form';
import config from '../config';
import $ from 'jquery';

export default class ProjectBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    getProjects() {
        this.serverRequest = $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', config.tokens.id);
            }
        }).done(function(data) {
            this.setState({
                projects: data,
            });
        }.bind(this));
    }

    createProject() {
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
        }).done(function() {
            this.getProjects();
        });
    }

    render() {
        return (
            <div className="block">
                <header>
                    <h2>Projects</h2>
                </header>
                <section>
                    <h3>Available projects</h3>
                    <ProjectList getProjectsHandler={this.getProjects} projects={this.state.projects} />
                </section>
                <section>
                    <h3>New project</h3>
                    <ProjectForm createProjectHandler={this.createProject} />
                </section>
            </div>
        );
    }

}