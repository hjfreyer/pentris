package com.hjfreyer.pentris.client.model;

import java.util.HashSet;
import java.util.Set;

public class Shapes {

	public static Set<Point> centered(Set<Point> points) {
		double dx = 0, dy = 0;

		for (Point p : points) {
			dx += p.getX();
			dy += p.getY();
		}
		dx /= points.size();
		dy /= points.size();

		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : points)
			newPoints.add(p.plus(-(int) Math.round(dx), -(int) Math.round(dy)));

		return newPoints;
	}

	public static Shape centered(Shape s) {
		return new Shape(centered(s.getPoints()), s.getColor());
	}

	public static Set<Point> rotatedRight(Set<Point> points) {
		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : points) {
			int dx = -p.getX() - p.getY();
			int dy = -p.getY() + p.getX();

			newPoints.add(p.plus(dx, dy));
		}

		return centered(newPoints);
	}

	public static Shape rotatedRight(Shape s) {
		return new Shape(rotatedRight(s.getPoints()), s.getColor());
	}

	public static Set<Point> rotatedLeft(Set<Point> points) {
		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : points) {
			int dx = -p.getX() + p.getY();
			int dy = -p.getY() - p.getX();

			newPoints.add(p.plus(dx, dy));
		}

		return centered(newPoints);
	}

	public static Shape rotatedLeft(Shape s) {
		return new Shape(rotatedLeft(s.getPoints()), s.getColor());
	}

	public static Set<Point> mirrored(Set<Point> points) {
		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : points) {
			newPoints.add(new Point(-p.getX(), -p.getY()));
		}

		return centered(newPoints);
	}

	public static Shape mirrored(Shape s) {
		return new Shape(mirrored(s.getPoints()), s.getColor());
	}

	// public boolean isInBounds(int width, int height) {
	// int top = height, bottom = 0, left = width, right = 0;
	//
	// for (Point p : getShape()) {
	// if (p.getX() > right)
	// right = p.getX();
	// if (p.getX() < left)
	// left = p.getX();
	// if (p.getY() > bottom)
	// bottom = p.getY();
	// if (p.getY() < top)
	// top = p.getY();
	// }
	//
	// // System.out.printf("%d %d %d %d\n",top,bottom,left,right);
	//
	// return top >= 0 && bottom < height && left >= 0 && right < width;
	// }
	//
	// public Shape duplicate() {
	// Shape res = new Shape();
	//
	// for (Point p : points)
	// res.add(new Point(p));
	// res.color = color;
	//
	// return res;
	// }
}
