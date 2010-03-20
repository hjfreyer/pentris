
package pentris;

import static pentris.PentrisApplet.*;

import java.awt.Graphics;
import java.awt.Color;
import java.util.*;

class Shape {
    private Set<Point> shape;
    private Point translation;
    public Color color;

    public Shape(){
	this.shape=new HashSet<Point>(5);
	this.translation=new Point(0,0);
	this.color=Color.white;
    }

    public void add(Point p){
	shape.add(p);
    }

    public void translate(int dx,int dy){
	shape_cache=null;
	translation.addIt(dx,dy);
    }

    public void translate(Point p){
	translate(p.getX(),p.getY());
    }

    private List<Point> shape_cache=null;
    public List<Point> getShape(){
	synchronized(shape){
	    if(shape_cache==null){
		shape_cache=new ArrayList<Point>(5);
		for(Point p:shape)
		    shape_cache.add(p.add(translation));
	    }
	}
	return shape_cache;
    }

    public void draw(Graphics g){
	g.setColor(color);
	
	for(Point p: getShape()){
	    g.fillRect(FIELD_MARGIN+p.getX()*BLOCK_WIDTH,
		       FIELD_MARGIN+p.getY()*BLOCK_HEIGHT,
		       BLOCK_WIDTH-BLOCK_PADDING,
		       BLOCK_HEIGHT-BLOCK_PADDING);
	}
    }
    
    public int size(){
	return shape.size();
    }


    public void center(){
	double dx=0,dy=0;
	
	for(Point p:shape){
	    dx+=p.getX();
	    dy+=p.getY();
	}
	dx/=(double)size();
	dy/=(double)size();

	synchronized(shape){
	    for(Point p:shape)
		p.addIt(-(int)Math.round(dx),-(int)Math.round(dy));
	}
    }

    public void rotate(){
	shape_cache=null;
	
	synchronized(shape){

	    for(Point p:shape){
		int dx=-p.getX()-p.getY();
		int dy=-p.getY()+p.getX();
		
		p.addIt(dx,dy);
	    }
	}

	center();
    }

    public void unrotate(){
	shape_cache=null;

	synchronized(shape){
	    
	    for(Point p:shape){
		int dx=-p.getX()+p.getY();
		int dy=-p.getY()-p.getX();
		
		p.addIt(dx,dy);
	    }
	}

	center();
    }

    public void mirror(){
	for(Point p:shape){
	    p.addIt(-p.getX()*2,0);
	}
    }


    public boolean isInBounds(int width,int height){
	int top=height,
	    bottom=0,
	    left=width,
	    right=0;
	
	for(Point p:getShape()){
	    if(p.getX()>right)
		right=p.getX();
	    if(p.getX()<left)
		left=p.getX();
	    if(p.getY()>bottom)
		bottom=p.getY();
	    if(p.getY()<top)
		top=p.getY();
	}

	//	System.out.printf("%d %d %d %d\n",top,bottom,left,right);
	
	return top>=0 && bottom < height && left >=0 && right < width;
    }

    public Shape duplicate(){
	Shape res= new Shape();

	for(Point p:shape)
	    res.add(new Point(p));
	res.color=color;

	return res;
    }
}
