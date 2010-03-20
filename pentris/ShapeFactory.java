
package pentris;

import java.util.*;
import java.awt.Color;

public class ShapeFactory {

    private static Random rand;


    // Pentominos 
    public static Shape getF(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,0));
	s.add(new Point(1,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(-1,1));

	s.center();
	
	return s;
    }
    public static Shape getI(){
	Shape s=new Shape();

	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(0,3));
	s.add(new Point(0,4));

	s.center();

	return s;

    }
    public static Shape getL(){
	Shape s=new Shape();

	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(0,3));
	s.add(new Point(1,3));

	s.center();

	return s;

    }
    public static Shape getN(){
	Shape s=new Shape();

	s.add(new Point(1,0));
	s.add(new Point(1,1));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(0,3));

	s.center();

	return s;

    }
    public static Shape getP(){
	Shape s=new Shape();

	s.add(new Point(0,0));
	s.add(new Point(1,0));
	s.add(new Point(0,1));
	s.add(new Point(1,1));
	s.add(new Point(1,-1));
	s.center();

	return s;

    }
    public static Shape getT(){
	Shape s=new Shape();

	s.add(new Point(-1,0));
	s.add(new Point(1,0));
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));

	s.center();

	return s;

    }
    public static Shape getU(){
	Shape s=new Shape();

	s.add(new Point(0,0));
	s.add(new Point(-1,0));
	s.add(new Point(1,0));
	s.add(new Point(1,-1));
	s.add(new Point(-1,-1));

	s.center();

	return s;

    }
    public static Shape getV(){
	Shape s=new Shape();

	s.add(new Point(0,-2));
	s.add(new Point(0,-1));
	s.add(new Point(0,0));
	s.add(new Point(1,0));
	s.add(new Point(2,0));

	s.center();

	return s;

    }
    public static Shape getW(){
	Shape s=new Shape();

	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(1,1));
	s.add(new Point(1,2));
	s.add(new Point(2,2));

	s.center();

	return s;

    }
    public static Shape getX(){
	Shape s=new Shape();

	s.add(new Point(0,0));
	s.add(new Point(-1,0));
	s.add(new Point(1,0));
	s.add(new Point(0,-1));
	s.add(new Point(0,1));

	s.center();

	return s;

    }
    public static Shape getY(){
	Shape s=new Shape();
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(0,3));
	s.add(new Point(-1,1));
	
	s.center();

	return s;

    }
    public static Shape getZ(){
	Shape s=new Shape();
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(-1,0));
	s.add(new Point(1,2));
	
	s.center();

	return s;

    }
    public static Shape getF2(){
	Shape s=getF();
	
	s.mirror();

	return s;

    }
    public static Shape getJ(){
	Shape s=getL();
		
	s.mirror();

	return s;
    }

    public static Shape getN2(){
	Shape s=getN();
		
	s.mirror();

	return s;
    }

    public static Shape getQ(){
	Shape s=getP();
		
	s.mirror();

	return s;
    }

    public static Shape getY2(){
	Shape s=getY();
		
	s.mirror();

	return s;
    }

    public static Shape getS(){
	Shape s=getZ();
		
	s.mirror();

	return s;
    }


    

    private static Color randomColor(){
	int a=0,b=0,c=0;
	
	int HI_BOUND=175;
	int LO_BOUND=100;

	while(!( ( a > HI_BOUND || b > HI_BOUND || c > HI_BOUND ) && 
		 ( a < LO_BOUND || b < LO_BOUND || c < LO_BOUND ))) {
	    a=rand.nextInt(255);
	    b=rand.nextInt(255);
	    c=rand.nextInt(255);
	}
	       

	return new Color(a,b,c);
    }

    public static List<Shape> getPentominos(){
	List<Shape> res=new ArrayList<Shape>(18);
	
	Shape s=null;

	rand= new Random(1);


	s=getF();
	s.color=randomColor();
	res.add(s);


	s=getI();
	s.color=randomColor();
	res.add(s);


	s=getN();
	s.color=randomColor();
	res.add(s);


	s=getP();
	s.color=randomColor();
	res.add(s);


	s=getT();
	s.color=randomColor();
	res.add(s);


	s=getU();
	s.color=randomColor();
	res.add(s);


	s=getV();
	s.color=randomColor();
	res.add(s);


	s=getW();
	s.color=randomColor();
	res.add(s);


	s=getX();
	s.color=randomColor();
	res.add(s);


	s=getY();
	s.color=randomColor();
	res.add(s);


	s=getZ();
	s.color=randomColor();
	res.add(s);


	s=getF2();
	s.color=randomColor();
	res.add(s);


	s=getJ();
	s.color=randomColor();
	res.add(s);


	s=getN2();
	s.color=randomColor();
	res.add(s);


	s=getQ();
	s.color=randomColor();
	res.add(s);


	s=getY2();
	s.color=randomColor();
	res.add(s);


	s=getS();
	s.color=randomColor();
	res.add(s);


	s=getL();
	s.color=randomColor();
	res.add(s);

	return res;
    }

    // Tetrominos
    public static Shape get4I(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(0,3));

	s.center();
	
	return s;
    }    

    public static Shape get4J(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(-1,2));

	s.center();
	
	return s;
    }    

    public static Shape get4L(){
	Shape s=get4J();
		
	s.mirror();

	return s;
    }    

    public static Shape get4O(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(1,0));
	s.add(new Point(1,1));

	s.center();
	
	return s;
    }    

    public static Shape get4S(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,1));
	s.add(new Point(1,1));
	s.add(new Point(1,0));
	s.add(new Point(2,0));

	s.center();
	
	return s;
    }    

    public static Shape get4Z(){
	Shape s=get4S();

	s.mirror();
	
	return s;
    }    

    public static Shape get4T(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	s.add(new Point(1,1));

	s.center();
	
	return s;
    }    

    public static List<Shape> getTetrominos(){
	List<Shape> res=new ArrayList<Shape>(7);
	
	Shape s=null;

	if(rand==null)
	    rand=new Random(1);

	s=get4I();
	s.color=randomColor();
	res.add(s);


	s=get4J();
	s.color=randomColor();
	res.add(s);


	s=get4L();
	s.color=randomColor();
	res.add(s);


	s=get4O();
	s.color=randomColor();
	res.add(s);


	s=get4S();
	s.color=randomColor();
	res.add(s);


	s=get4Z();
	s.color=randomColor();
	res.add(s);


	s=get4T();
	s.color=randomColor();
	res.add(s);

	return res;
    }

    //Tromino

    public static Shape get3I(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(0,2));
	
	s.center();
	
	return s;
    }    

    public static Shape get3L(){
	Shape s=new Shape();

	s.color=Color.blue;
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));
	s.add(new Point(1,1));

	s.center();
	
	return s;
    }    

    public static List<Shape> getTrominos(){
	List<Shape> res=new ArrayList<Shape>(2);
	
	Shape s=null;

	if(rand==null)
	    rand=new Random(1);

	s=get3I();
	s.color=randomColor();
	res.add(s);


	s=get3L();
	s.color=randomColor();
	res.add(s);

	return res;
    }

    public static Shape getDomino(){

	if(rand==null)
	    rand=new Random(1);

	Shape s=new Shape();

	s.color=randomColor();
	
	s.add(new Point(0,0));
	s.add(new Point(0,1));

	s.center();
	
	return s;
    }

    public static Shape getMonomino(){

	if(rand==null)
	    rand=new Random(1);

	Shape s=new Shape();

	s.color=randomColor();
	
	s.add(new Point(0,0));

	s.center();
	
	return s;
    }
}