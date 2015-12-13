/*
	The Cedric's Swiss Knife (CSK) - CSK terminal toolbox
	
	Copyright (c) 2009 - 2015 Cédric Ronvel 
	
	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/



// Load modules
var Widget = require( './Widget.js' ) ;


function Button() { throw new Error( 'Use Button.create() instead' ) ; }
module.exports = Button ;
Button.prototype = Object.create( Widget.prototype ) ;
Button.prototype.constructor = Button ;
Button.prototype.widgetType = 'button' ;



Button.create = function createButton( options )
{
	var button = Object.create( Button.prototype ) ;
	button.create( options ) ;
	return button ;
} ;



Button.prototype.create = function createButton( options )
{
	if ( ! options || typeof options !== 'object' ) { options = {} ; }
	
	Widget.prototype.create.call( this , options ) ;
	
	Object.defineProperties( this , {
		blurAttr: { value: options.blurAttr || { bgColor: 'blue' } , enumerable: true , writable: true } ,
		focusAttr: { value: options.focusAttr || { bgColor: 'brightBlack' } , enumerable: true , writable: true } ,
	} ) ;
} ;



Button.prototype.draw = function draw()
{
	if ( this.hasFocus ) { this.dst.put( { x: this.x , y: this.y , attr: this.attr } , this.label ) ; }
	else { this.dst.put( { x: this.x , y: this.y , attr: this.attr } , this.label ) ; }
	
	// Move the cursor back to the first cell
	this.dst.moveTo( this.x , this.y ) ;
} ;



Button.prototype.onFocus = function onFocus( focus )
{
	this.hasFocus = focus ;
	this.draw() ;
} ;



Button.prototype.onKey = function onKey( key , trash , data )
{
	Widget.prototype.onKey.call( this , key , trash , data ) ;
	
	switch ( key )
	{
		case 'KP_ENTER' :
		case 'ENTER' :
			this.emit( 'press' ) ;
			break ;
	}
} ;


