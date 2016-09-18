var ProjectList = React.createClass({
	getInitialState: function() {
		return {data: [], message: null};
	},
	componentDidMount: function() {
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
	},
	render: function() {
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
});

var ProjectListItem = React.createClass({
	render: function() {
		return <p>{this.props.name}</p>
	}
});

$(document).ready(function(){

	ReactDOM.render(
		<ProjectList url="/api/project/" />,
		$('#project-list')[0]
	);

});
