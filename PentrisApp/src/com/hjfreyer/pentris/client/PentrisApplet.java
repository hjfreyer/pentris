
package pentris;

import java.awt.Graphics;
import java.awt.Color;
import java.awt.Image;
import java.awt.event.*;
import java.applet.*;
import java.util.*;

public class PentrisApplet extends BufferedApplet implements KeyListener{

    public static final int 
	FIELD_WIDTH   = 12,
	FIELD_HEIGHT  = 24,
	FIELD_MARGIN  = 5,
	BLOCK_WIDTH   = 20,
	BLOCK_HEIGHT  = 20,
	BLOCK_PADDING = 1;

    public Timer timer = null;


    public TetrisGame game=new TetrisGame(FIELD_WIDTH, FIELD_HEIGHT);

    public boolean fresh=true;
    public boolean paused=true;
    
    public Image logo;

    public void init(){
	addKeyListener(this);

	addMouseListener(new MouseAdapter(){
		public void mouseClicked(MouseEvent me){
		    if(fresh || game.game_over()){
			game.reset();
			game.start();
			paused = false;
		    }    

		    fresh=false;
		}
	    });

	

	for(Shape s:ShapeFactory.getPentominos())
	    game.addShape(s);
	for(Shape s:ShapeFactory.getTetrominos())
	    game.addShape(s);
	for(Shape s:ShapeFactory.getTrominos())
	    game.addShape(s);
	
	game.addShape(ShapeFactory.getDomino());
	game.addShape(ShapeFactory.getMonomino());

	logo = getImage(getDocumentBase(), "pentris.jpg");
    }

    public void render(Graphics g){
	if(!paused && timer==null){
	    timer=new Timer();
	    timer.schedule(drop_down(), 0, 500);
	} else if(paused && timer != null){
	    timer.cancel();
	    timer=null;
	}

	g.setColor(Color.black);
	g.fillRect(0,0,
		   FIELD_WIDTH*BLOCK_WIDTH+FIELD_MARGIN*2,
		   FIELD_HEIGHT*BLOCK_HEIGHT+FIELD_MARGIN*2+15);
	
	if(fresh){
	    g.drawImage(logo, -5, 125, 253, 84, this);
	    g.setColor(Color.white);
	    g.drawString("Click to Start", 80, 300);
	} else{
	    g.setColor(Color.white);
	    
	    if(game.active!=null)
		game.active.draw(g);
	    game.dead.draw(g);
	    
	    g.setColor(Color.white);
	    g.drawString("Score: "+game.getScore(), 
			 10, FIELD_HEIGHT*BLOCK_HEIGHT+FIELD_MARGIN*2+8);

	    if(game.game_over()){
		paused=true;
		g.setColor(Color.black);
		g.fillRect(45, 185, 177, 25);
	
		g.setColor(Color.white);
		g.drawString("Game over.  Click to retry.", 50, 200);
	    }
	}
    }

    public TimerTask drop_down(){
	return new TimerTask(){
	    public void run(){
		game.step();
		repaint();
	    }
	};
    }
	
    private Set<Integer> holding=new HashSet<Integer>();
    public void keyPressed(KeyEvent ke){
	if(ke.getKeyCode() == KeyEvent.VK_P){
	    paused = !paused || fresh || game.game_over();
	}

	if(paused)
	    return;

	boolean hold=holding.contains(ke.getKeyCode());

	switch(ke.getKeyCode()){
	case KeyEvent.VK_UP:
	    game.rotate();
	    break;
	case KeyEvent.VK_RIGHT:
	    game.moveRight(hold);
	    break;
	case KeyEvent.VK_LEFT:
	    game.moveLeft(hold);
	    break;
	case KeyEvent.VK_DOWN:
	    game.moveDown(false);
	    break;
	case KeyEvent.VK_SPACE:  // Space is equivalent to holding down down
	    game.moveDown(true);
	    break;
	}	
	
	holding.add(ke.getKeyCode());
	
	repaint();
    }


    public void keyReleased(KeyEvent ke){
	holding.remove(ke.getKeyCode());
    }
    public void keyTyped(KeyEvent ke){
    }
}

