// set and cache variables
var w, container, carousel, item, radius, itemLength, rY, ticker, fps; 
var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;
var addX = 0;


$(document).ready( init )

function init()
{
    w = $(window);
    container = $( '#contentContainer' );
    carousel = $( '#carouselContainer' );
    item = $( '.carouselItem' );
    itemLength = $( '.carouselItem' ).length;
    fps = $('#fps');
    rY = 360 / itemLength;
    radius = Math.round( (250) / Math.tan( Math.PI / itemLength ) );
    
    // set container 3d props
    TweenMax.set(container, {perspective:600})
    TweenMax.set(carousel, {z:-(radius)})
    
    // create carousel item props
    
    for ( var i = 0; i < itemLength; i++ )
    {
        var $item = item.eq(i);
        var $block = $item.find('.carouselItemInner');
        
TweenMax.set($item, {rotationY:rY * i, z:radius, transformOrigin:"50% 50% " + -radius + "px"});
        
        animateIn( $item, $block )						
    }
    
    // set mouse x and y props and looper ticker
    window.addEventListener( "mousemove", onMouseMove, false );
    ticker = setInterval( looper, 1000/60 );			
}

function animateIn( $item, $block )
{
    var $nrX = 5 * getRandomInt(2);
    var $nrY = 5 * getRandomInt(2);
        
    var $nx = -(1000) + getRandomInt( 5000 )
    var $ny = -(1000) + getRandomInt( 5000 )
    var $nz = -50 +  getRandomInt( 500 )
        
    var $s = 1.5 + (getRandomInt( 5 ) * .1)
    var $d = 1 - (getRandomInt( 4 ) * .1)
    
    TweenMax.set( $item, { autoAlpha:1, delay:$d } )	
    TweenMax.set( $block, { z:$nz, rotationY:$nrY, rotationX:$nrX, x:$nx, y:$ny, autoAlpha:0} )
    TweenMax.to( $block, $s, { delay:$d, rotationY:0, rotationX:0, z:0,  ease:Expo.easeInOut} )
    TweenMax.to( $block, $s-.5, { delay:$d, x:0, y:0, autoAlpha:1, ease:Expo.easeInOut} )
}

function onMouseMove(event)
{
    mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0025;
    mouseY = -(-(window.innerHeight * .5) + event.pageY ) * .01;
    mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + event.pageY ) - 200);
}

// loops and sets the carousel 3d properties
function looper()
{
    addX += mouseX
    TweenMax.to( carousel, 1, { rotationY:addX, rotationX:mouseY, ease:Quint.easeOut } )
    TweenMax.set( carousel, {z:mouseZ } )
    fps.text( 'Framerate: ' + counter.tick() + '/60 FPS' )	
}

function getRandomInt( $n )
{
    return Math.floor((Math.random()*$n)+1);	
}