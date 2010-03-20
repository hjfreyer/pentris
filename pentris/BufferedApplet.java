
package pentris;

import java.awt.*;

public class BufferedApplet extends java.applet.Applet implements Runnable
{
/*
   THIS CLASS HANDLES DOUBLE BUFFERING FOR YOU, SO THAT THE IMAGE
   DOESN'T FLICKER WHILE YOU'RE RENDERING IT.  YOU DON'T REALLY
   NEED TO WORRY ABOUT THIS TOO MUCH, AND YOU'LL PROBABLY NEVER NEED
   TO CHANGE IT.  IT'S REALLY JUST USEFUL LOW LEVEL PLUMBING.
*/

   public void render(Graphics g) { }   // *you* define how to render
   public boolean damage = true;        // you can force a render

   private Image image = null;
   private Graphics buffer = null;
   private Thread t;
   private Rectangle r = new Rectangle(0, 0, 0, 0);

   // A BACKGROUND THREAD CHECKS FOR CHANGES ABOUT 30 TIMES PER SECOND

   public void start() { if (t == null) { t = new Thread(this); t.start(); } }
   public void stop()  { if (t != null) { t.stop(); t = null; } }
   public void run()   { try { while (true) { repaint(); t.sleep(30); } }
                             catch(InterruptedException e){}; }
/*
   UPDATE GETS CALLED BY THE SYSTEM.
   IT CALLS YOUR RENDER METHOD, WHICH DRAWS INTO AN OFF-SCREEN IMAGE.
   THEN UPDATE COPIES THE IMAGE YOU'VE RENDERED ONTO THE APPLET WINDOW.
*/

   public void update(Graphics g) {
      if (r.width != bounds().width || r.height != bounds().height) {
         image = createImage(bounds().width, bounds().height);
         buffer = image.getGraphics();
         r = bounds();
         damage = true;
      }
      render(buffer);
      damage = false;
      if (image != null)
         g.drawImage(image,0,0,this);
   }
}

