package com.hjfreyer.pentris.client;

public class Point {
	private final int x, y;

	public Point(int x, int y) {
		this.x = x;
		this.y = y;
	}

	public Point plus(int dx, int dy) {
		return new Point(x + dx, y + dy);
	}

	public Point plus(Point p) {
		return plus(p.x, p.y);
	}

	public Point opposite() {
		return new Point(-x, -y);
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	@Override
	public String toString() {
		return "Point [x=" + x + ", y=" + y + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + x;
		result = prime * result + y;
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
		Point other = (Point) obj;
		if (x != other.x)
			return false;
		if (y != other.y)
			return false;
		return true;
	}

}