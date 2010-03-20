package com.hjfreyer.pentris.client.model;

import java.util.Set;

import com.hjfreyer.pentris.client.util.Color;

public class Shape {
	private final Set<Point> points;
	private final Color color;

	public Shape(Set<Point> points, Color color) {
		this.points = points;
		this.color = color;
	}

	public Shape(Set<Point> s) {
		this(s, Color.GRAY);
	}

	public Set<Point> getPoints() {
		return points;
	}

	public Color getColor() {
		return color;
	}

	public Point getCenter() {
		double x = 0, y = 0;

		for (Point p : points) {
			x += p.getX();
			y += p.getY();
		}
		x /= points.size();
		y /= points.size();

		return new Point((int) Math.round(x), (int) Math.round(y));
	}

	@Override
	public String toString() {
		return "Shape [color=" + color + ", points=" + points + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((color == null) ? 0 : color.hashCode());
		result = prime * result + ((points == null) ? 0 : points.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Shape other = (Shape) obj;
		if (color == null) {
			if (other.color != null)
				return false;
		} else if (!color.equals(other.color))
			return false;
		if (points == null) {
			if (other.points != null)
				return false;
		} else if (!points.equals(other.points))
			return false;
		return true;
	}

}
