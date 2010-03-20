
package pentris;

import java.util.*;

public class TetrisGame {
    private int width, height;
    
    private List<Shape> shapeHeap;
    
    public Shape active, onDeck;
    public DeadShape dead;
    
    private Random random;
    private int score=0;

    private boolean game_over=false;

    public TetrisGame(int width, int height){
	this.width=width;
	this.height=height;
	
	dead=new DeadShape();
	
	random=new Random();

	shapeHeap=new ArrayList<Shape>();
    }

    public void addShape(Shape s){
	shapeHeap.add(s);
    }

    public void start(){
	onDeck=randomShape();
	active=null;
    }

    public void step(){
	if(active==null){
	    active=onDeck;
	    onDeck=randomShape();
	    
	    score+=(int)Math.pow(2, dead.clearRows()) - 1;
	    
	    active.translate(width/2,-active.size());
	    
	    while(!active.isInBounds(width,height))
		active.translate(0,1);

	    if(dead.intersects(active))
		game_over=true;
	} else 
	    if(moveDown(false)){
		dead.add(active);
		active=null;
		step();
	    }
    }


    public boolean moveLeft(boolean zoom){
	return move(-1,0,zoom);
    }

    public boolean moveRight(boolean zoom){
	return move(1,0,zoom);
    }

    public boolean moveDown(boolean zoom){
	return move(0,1,zoom);
    }

    public int getScore(){
	return score;
    }

    public boolean game_over(){
	return game_over;
    }
    
    public void reset(){
	dead = new DeadShape();
	game_over=false;
	score=0;
    }

    public boolean rotate(){
	if(active==null)
	    return false;

	active.rotate();
	
	if(!active.isInBounds(width,height) ||
	   dead.intersects(active)){
	    active.unrotate();	    
	    return true;
	} else 
	    return false;
    }


    private synchronized boolean move(int dx, int dy,boolean zoom){
	if(active==null)
	    return false;
	do{
	    active.translate(dx,dy);
	} while(zoom && 
		active.isInBounds(width,height) &&
		!dead.intersects(active));
	    
	
	if(!active.isInBounds(width,height) ||
	   dead.intersects(active)){
	    active.translate(-dx,-dy);
	    
	    return true;
	} else 
	    return false;
    }

    private Shape randomShape(){
	return shapeHeap.get(random.nextInt(shapeHeap.size())).duplicate();
    }
}