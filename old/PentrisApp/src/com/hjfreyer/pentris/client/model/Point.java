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

import com.hjfreyer.pentris.client.util.Color;

public class Point {
	private final int x, y;
	private final Color color;

	public Point(int x, int y, Color color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	public Point(int x, int y) {
		this(x, y, null);
	}

	public Point plus(int dx, int dy) {
		return new Point(x + dx, y + dy, color);
	}

	public Point plus(Point p) {
		return plus(p.x, p.y);
	}

	public Point opposite() {
		return new Point(-x, -y, color);
	}

	public boolean isInBounds(int width, int height) {
		// Note that top is open ended
		return 0 <= x && x < width && 0 <= y && y < height;
	}

	public boolean isInBoundsTopOpen(int width, int height) {
		return 0 <= x && x < width && y < height;
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

	public Color getColor() {
		return color;
	}

}