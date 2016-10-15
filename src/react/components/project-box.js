import React from 'react';
import ProjectList from './project-list';
import ProjectForm from './project-form';

export default class ProjectBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="block">
                <header>
                    <h2>Projects</h2>
                </header>
                <section>
                    <h3>Available projects</h3>
                    <ProjectList url={this.props.url} />
                </section>
                <section>
                    <h3>New project</h3>
                    <ProjectForm url={this.props.url} />
                </section>
            </div>
        );
    }

}