package com.hjfreyer.pentris.client.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.hjfreyer.pentris.client.util.Pair;

public class Shapes {

	public static Shape translated(Shape shape, int dx, int dy) {
		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : shape.getPoints())
			newPoints.add(p.plus(dx, dy));

		return new Shape(newPoints);
	}

	public static Shape translatedTo(Shape shape, int x, int y) {
		Point center = shape.getCenter();

		return translated(shape, x - center.getX(), y - center.getY());
	}

	public static Shape translatedTo(Shape shape, Point p) {
		return translatedTo(shape, p.getX(), p.getY());
	}

	public static Shape rotatedRight(Shape shape) {
		Point center = shape.getCenter();
		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : shape.getPoints()) {
			newPoints.add(new Point(-p.getY(), p.getX(), p.getColor()));
		}

		return translatedTo(new Shape(newPoints), center);
	}

	public static Shape rotatedLeft(Shape shape) {
		Point center = shape.getCenter();
		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : shape.getPoints()) {
			newPoints.add(new Point(p.getY(), -p.getX(), p.getColor()));
		}

		return translatedTo(new Shape(newPoints), center);
	}

	public static Set<Point> mirrored(Set<Point> points) {
		Set<Point> newPoints = new HashSet<Point>();

		for (Point p : points) {
			newPoints.add(new Point(-p.getX(), p.getY(), p.getColor()));
		}

		return newPoints;
	}

	public static Shape mirrored(Shape s) {
		return new Shape(mirrored(s.getPoints()));
	}

	public static Pair<Shape, Integer> clear(Shape deadShape, int width) {
		Map<Integer, Integer> rowCount = new HashMap<Integer, Integer>();
		for (Point p : deadShape.getPoints()) {
			if (!rowCount.containsKey(p.getY())) {
				rowCount.put(p.getY(), 0);
			}

			rowCount.put(p.getY(), rowCount.get(p.getY()) + 1);
		}

		Set<Integer> clearedRows = new HashSet<Integer>();
		for (int row : rowCount.keySet()) {
			if (rowCount.get(row) == width) {
				clearedRows.add(row);
			}
		}

		Map<Integer, Integer> rowMap = new HashMap<Integer, Integer>();
		for (int row : rowCount.keySet()) {
			int shift = 0;
			for (int clearedRow : clearedRows) {
				if (clearedRow > row) {
					shift++;
				}
			}

			rowMap.put(row, row + shift);
		}

		Set<Point> newPoints = new HashSet<Point>();
		for (Point p : deadShape.getPoints()) {
			if (clearedRows.contains(p.getY())) {
				continue;
			}
			newPoints.add(new Point(p.getX(), rowMap.get(p.getY()), p.getColor()));
		}

		return Pair.of(new Shape(newPoints), clearedRows.size());
	}

	public static Shape union(Shape a, Shape b) {
		Set<Point> set = new HashSet<Point>();

		set.addAll(a.getPoints());
		set.addAll(b.getPoints());

		return new Shape(set);
	}
}
