import React from 'react';
import ProjectBox from './project-box.js';
import $ from 'jquery';
import '../api-call.jquery';

export default class ProjectController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        }
    }

    getProjects() {
        this.getProjectsHandle = $.apiCall('GET', '/project/')
            .done(function(data) {
                this.setState({
                    projectList: data,
                });
            }.bind(this));
    }

    createProject() {
        this.createProjectHandle = $.apiCall('POST', '/project/', {
            name: this.state.name,
            google_doc_id: this.state.google_doc_id,
            section: this.state.section
        })
            .done(function() {
                this.getProjects();
            });
    }

    componentDidMount() {

    }

    render() {
        return (
            <ProjectBox projectList={this.state.projectList} />
        );
    }

}