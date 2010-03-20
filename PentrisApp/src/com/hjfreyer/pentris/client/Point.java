
package pentris;

public class Point {
    private int x, y;

    public Point(int x, int y){
	this.x=x;
	this.y=y;
    }

    public Point(Point p){
	this.x=p.x;
	this.y=p.y;
    }

    public Point add(int dx,int dy){ return new Point(x+dx,y+dy); }
    public Point add(Point p){ return add(p.x,p.y); }
    
    public void addIt(int dx,int dy){ x+=dx;y+=dy; }
    public void addIt(Point p){ addIt(p.x,p.y); }
    
    public Point opposite(){ return new Point(-x,-y); }
    public void oppositeIt(){ x=-x;y=-y; }
    
    public int getX(){ return x; }
    public int getY(){ return y; }

    public String toString(){
	return "("+x+", "+y+") ";
    }
    
    
    public boolean equals(Object o){
	return o.toString().equals(toString());
    }

    public int hashCode(){
	return toString().hashCode();
    }
}