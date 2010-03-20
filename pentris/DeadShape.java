
package pentris;

import java.awt.*;
import static pentris.PentrisApplet.*;

public class DeadShape extends Shape{

    public Color[][] field;
    
    public DeadShape(){
	field=new Color[FIELD_WIDTH][FIELD_HEIGHT];
	for(int i=0;i<FIELD_WIDTH;i++)
	    for(int j=0;j<FIELD_HEIGHT;j++)
		field[i][j]=Color.black;
    }

    public void add(Shape s){
	for(Point p:s.getShape())
	    field[p.getX()][p.getY()]=s.color;
    }

    public boolean intersects(Shape s){
	for(Point p1:s.getShape())
	    if(field[p1.getX()][p1.getY()]!=Color.black)
		return true;
	return false;
    }

    public int clearRows(){
	int shift=0;
	
	// Shift rows down
	for(int j=FIELD_HEIGHT-1; j>=0; j--){
	    if(shift!=0)
		for(int i=0;i<FIELD_WIDTH;i++)
		    field[i][j+shift]=field[i][j];
	    
	    
	    for(int i=0;i<FIELD_WIDTH;i++){
		if(field[i][j]==Color.black)
		    break;
		if(i==FIELD_WIDTH-1){
		    shift++;
		}
	    }
	}
	
	return shift;
    }
    
    public void draw(Graphics g){
	
	for(int x=0;x<FIELD_WIDTH;x++)
	    for(int y=0;y<FIELD_HEIGHT;y++){
		if(field[x][y]!=Color.black){
		    g.setColor(field[x][y]);
		    g.fillRect(FIELD_MARGIN+x*BLOCK_WIDTH,
			       FIELD_MARGIN+y*BLOCK_HEIGHT,
			       BLOCK_WIDTH-BLOCK_PADDING,
			       BLOCK_HEIGHT-BLOCK_PADDING);
		}
	    }
    }
}