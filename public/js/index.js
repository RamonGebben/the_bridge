function Manager(){
	this.workspaces = [];
}


function Window(){}

function WorkSpace(){}

function Icon(){}

Icon.prototype.create = function( name ){
	var $icon = $('<div class="icon" data-app="'+ name +'"></div>');
	var $app_name = $('<span>'+ name +'</span>');
	$icon.append( $app_name );

	return $icon;
}

WorkSpace.prototype.create = function ( alias ){
	var wp = $('<div class="workspace current '+ alias +'"></div>');
	return wp;
}

Window.prototype.create = function( alias ){
	// Create the elements
	var $wind = $('<div class="window '+ alias.toLowerCase() +'"></div>');
	var $topbar = $('<div class="title_bar"></div>');
	var $left_corner = $('<span class="left_corner"></span>');

	// Build the left corner
	$left_corner.append('<span data-window='+ alias +' data-action="close" class="close_window"></span>');
	$left_corner.append('<span data-window='+ alias +' data-action="minimize" class="minimize_window"></span>');
	$left_corner.append('<span data-window='+ alias +' data-action="fullscreen" class="resize_window"></span>');

	// Append it
	$topbar.append( $left_corner );
	$topbar.append('<span class="text">'+ alias +'</span>');

	$wind.append( $topbar );

	// Bind drag event to the topbar
	DragDrop.bind($wind[0], {
   		anchor: $topbar[0],
    	dragstart: function( evt ) {
        // Do something
    }
});

	// Return the pretty window
	return $wind;
}

Window.prototype.openApp = function( name ){
	var _window = this.create( name );
	var $app = $('<iframe class="app" src="/apps/'+ name +'/index.html"></iframe>');
	$( _window ).append( $app );

	$('.workspace.current').append( _window );
}

// Make window bigger on double click
$(document).on('dblclick', '.window', {form_key:10}, function( evt ){
	// TODO: Move this behavior to top bar when in place.
	$( evt.currentTarget ).toggleClass('big');
});
// corner buttons
$(document).on('click', '.left_corner span', function( evt ){
	var action = $( evt.currentTarget ).data('action');
	var _window = $( evt.currentTarget ).data('window');

	switch( action ){
    case 'close':
        $( '.' + _window ).remove();
        break;
    case 'minimize':
        console.log('minimize');
        $( '.' + _window ).addClass('minimized');
        console.log( _window )
        break;
    case 'fullscreen':
        console.log('fullscreen');
        $( '.' + _window ).toggleClass('fullscreen');
        break;
    default:
        // do nothing
        console.log('you clicked something!');
	}

});

var venster = new Window();
var workspace = new WorkSpace();
var icon = new Icon();


$(document).on('click', '.window.minimized', function( evt ){
	$( evt.currentTarget ).removeClass('minimized');
});

// Sloppy focus
$(document).on('mouseenter', '.window', {form_key:10}, function( evt ){
	$( evt.currentTarget ).addClass('focused');
});
$(document).on('mouseleave', '.window', function( evt ){
	$( evt.currentTarget ).removeClass('focused');
});

// Open app on icon
$( document ).on('click', '.icon', function( evt ){
	var app = $( evt.currentTarget ).data('app');
	venster.openApp( app );
});

function setupDesktop(){
	$('body').append( workspace.create('desktop') );
	var $icon = icon.create('projects');
	$('.desktop').append( $icon );
}

function testSetup(){

	setupDesktop();
}

$(document).ready(function(){
	testSetup();
});


