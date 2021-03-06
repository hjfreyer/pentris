/* 
 * Copyright 2010 Hunter Freyer <yt@hjfreyer.com>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.hjfreyer.pentris.client.model;

import java.util.Set;

public class Shape {
	private final Set<Point> points;

	public Shape(Set<Point> points) {
		this.points = points;
	}

	public Set<Point> getPoints() {
		return points;
	}

	public Point getCenter() {
		double x = 0, y = 0;

		for (Point p : points) {
			x += p.getX();
			y += p.getY();
		}
		x /= points.size();
		y /= points.size();

		return new Point((int) Math.round(x), (int) Math.round(y), null);
	}

	public int getHeight() {
		int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;

		for (Point p : points) {
			min = Math.min(min, p.getY());
			max = Math.max(max, p.getY());
		}

		return max - min + 1;
	}

	@Override
	public String toString() {
		return "Shape [points=" + points + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
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
		if (points == null) {
			if (other.points != null)
				return false;
		} else if (!points.equals(other.points))
			return false;
		return true;
	}

	public boolean intersects(Shape other) {
		for (Point p : points) {
			if (other.getPoints().contains(p)) {
				return true;
			}
		}

		return false;
	}

	public boolean isInBounds(int width, int height) {
		for (Point p : points) {
			if (!p.isInBoundsTopOpen(width, height)) {
				return false;
			}
		}
		return true;
	}

	public int getMaxY() {
		int max = Integer.MIN_VALUE;

		for (Point p : points) {
			max = Math.max(max, p.getY());
		}

		return max;
	}
}
