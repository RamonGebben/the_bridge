
var projects;


function getProjects(){
	$.getJSON( "/projects", function( data ) {
		projects = data;
	 }).done( renderProjects );
}

function renderProjects(){
	for (var i = 0; i < projects.length; i++) {
		var $icon = $('<div class="icon" data-project="'+ projects[i].title.toLowerCase().replace(' ', '-') +'"></div>');
		var $project_name = $('<span>'+ projects[i].title.split('.devstar.ra-ge.net')[0] +'</span>');
		$icon.append( $project_name );
		$('body').append( $icon );
	};
}

$( document ).on('click', '.icon', function( evt ){
	var project = $( evt.currentTarget ).data('project');
	window.parent.postMessage( { name: project, action: 'editor' } , '*')
});


$(document).ready(function(){
	getProjects();
});
