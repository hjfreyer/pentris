package com.hjfreyer.pentris.client;

import java.awt.Color;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import com.hjfreyer.pentris.client.model.Point;
import com.hjfreyer.pentris.client.model.Shape;
import com.hjfreyer.pentris.client.model.Shapes;

public class PentrisShapeFactory implements ShapeFactory {

	private static Random rand;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.hjfreyer.pentris.client.ShapeFactory#getShapes()
	 */
	public Set<Shape> getShapes() {
		Set<Shape> shapes = new HashSet<Shape>();

		shapes.add(getMonomino());
		shapes.add(getDomino());
		shapes.addAll(getTrominos());
		shapes.addAll(getTetrominos());
		shapes.addAll(getPentominos());

		return shapes;
	}

	// Pentominos
	public static Shape getF() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(1, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(-1, 1));

		return new Shape(s);
	}

	public static Shape getI() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(0, 3));
		s.add(new Point(0, 4));

		return new Shape(s);

	}

	public static Shape getL() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(0, 3));
		s.add(new Point(1, 3));

		return new Shape(s);

	}

	public static Shape getN() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(1, 0));
		s.add(new Point(1, 1));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(0, 3));

		return new Shape(s);

	}

	public static Shape getP() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(1, 0));
		s.add(new Point(0, 1));
		s.add(new Point(1, 1));
		s.add(new Point(1, -1));

		return new Shape(s);

	}

	public static Shape getT() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(-1, 0));
		s.add(new Point(1, 0));
		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));

		return new Shape(s);

	}

	public static Shape getU() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(-1, 0));
		s.add(new Point(1, 0));
		s.add(new Point(1, -1));
		s.add(new Point(-1, -1));

		return new Shape(s);

	}

	public static Shape getV() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, -2));
		s.add(new Point(0, -1));
		s.add(new Point(0, 0));
		s.add(new Point(1, 0));
		s.add(new Point(2, 0));

		return new Shape(s);

	}

	public static Shape getW() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(1, 1));
		s.add(new Point(1, 2));
		s.add(new Point(2, 2));

		return new Shape(s);

	}

	public static Shape getX() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(-1, 0));
		s.add(new Point(1, 0));
		s.add(new Point(0, -1));
		s.add(new Point(0, 1));

		return new Shape(s);

	}

	public static Shape getY() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(0, 3));
		s.add(new Point(-1, 1));

		return new Shape(s);

	}

	public static Shape getZ() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(-1, 0));
		s.add(new Point(1, 2));

		return new Shape(s);

	}

	public static Shape getF2() {
		Shape s = getF();

		return Shapes.mirrored(s);
	}

	public static Shape getJ() {
		Shape s = getL();

		return Shapes.mirrored(s);
	}

	public static Shape getN2() {
		Shape s = getN();

		return Shapes.mirrored(s);
	}

	public static Shape getQ() {
		Shape s = getP();

		return Shapes.mirrored(s);
	}

	public static Shape getY2() {
		Shape s = getY();

		return Shapes.mirrored(s);
	}

	public static Shape getS() {
		Shape s = getZ();

		return Shapes.mirrored(s);
	}

	private static Color randomColor() {
		int a = 0, b = 0, c = 0;

		int HI_BOUND = 175;
		int LO_BOUND = 100;

		while (!((a > HI_BOUND || b > HI_BOUND || c > HI_BOUND) && (a < LO_BOUND
				|| b < LO_BOUND || c < LO_BOUND))) {
			a = rand.nextInt(255);
			b = rand.nextInt(255);
			c = rand.nextInt(255);
		}

		return new Color(a, b, c);
	}

	public static List<Shape> getPentominos() {
		List<Shape> res = new ArrayList<Shape>(18);

		Shape s = null;

		rand = new Random(1);

		s = getF();

		res.add(s);

		s = getI();

		res.add(s);

		s = getN();

		res.add(s);

		s = getP();

		res.add(s);

		s = getT();

		res.add(s);

		s = getU();

		res.add(s);

		s = getV();

		res.add(s);

		s = getW();

		res.add(s);

		s = getX();

		res.add(s);

		s = getY();

		res.add(s);

		s = getZ();

		res.add(s);

		s = getF2();

		res.add(s);

		s = getJ();

		res.add(s);

		s = getN2();

		res.add(s);

		s = getQ();

		res.add(s);

		s = getY2();

		res.add(s);

		s = getS();

		res.add(s);

		s = getL();

		res.add(s);

		return res;
	}

	// Tetrominos
	public static Shape get4I() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(0, 3));

		return new Shape(s);
	}

	public static Shape get4J() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(-1, 2));

		return new Shape(s);
	}

	public static Shape get4L() {
		Shape s = get4J();

		return Shapes.mirrored(s);
	}

	public static Shape get4O() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(1, 0));
		s.add(new Point(1, 1));

		return new Shape(s);
	}

	public static Shape get4S() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 1));
		s.add(new Point(1, 1));
		s.add(new Point(1, 0));
		s.add(new Point(2, 0));

		return new Shape(s);
	}

	public static Shape get4Z() {
		Shape s = get4S();

		return Shapes.mirrored(s);
	}

	public static Shape get4T() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));
		s.add(new Point(1, 1));

		return new Shape(s);
	}

	public static List<Shape> getTetrominos() {
		List<Shape> res = new ArrayList<Shape>(7);

		Shape s = null;

		if (rand == null)
			rand = new Random(1);

		s = get4I();

		res.add(s);

		s = get4J();

		res.add(s);

		s = get4L();

		res.add(s);

		s = get4O();

		res.add(s);

		s = get4S();

		res.add(s);

		s = get4Z();

		res.add(s);

		s = get4T();

		res.add(s);

		return res;
	}

	// Tromino

	public static Shape get3I() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(0, 2));

		return new Shape(s);
	}

	public static Shape get3L() {
		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));
		s.add(new Point(1, 1));

		return new Shape(s);
	}

	public static List<Shape> getTrominos() {
		List<Shape> res = new ArrayList<Shape>(2);

		Shape s = null;

		if (rand == null)
			rand = new Random(1);

		s = get3I();

		res.add(s);

		s = get3L();

		res.add(s);

		return res;
	}

	public static Shape getDomino() {

		if (rand == null)
			rand = new Random(1);

		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));
		s.add(new Point(0, 1));

		return new Shape(s);
	}

	public static Shape getMonomino() {

		if (rand == null)
			rand = new Random(1);

		Set<Point> s = new HashSet<Point>();

		s.add(new Point(0, 0));

		return new Shape(s);
	}
}