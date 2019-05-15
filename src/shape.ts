
export type Shape = Array<[number, number]>;

export function mirrored(s: Shape): Shape {
  return s.map(([row, col]) => [row, -col]);
}

export function transpose(s: Shape): Shape {
  return s.map(([row, col]) => [col, row]);
}

export function bbox(s: Shape): [number, number, number, number] {
  const rows = s.map(([row, _]) => row);
  const cols = s.map(([_, col]) => col);
  return [Math.min(...rows), Math.min(...cols),
  Math.max(...rows), Math.max(...cols)];
}

export function center(s: Shape): [number, number] {
  const [minRow, minCol, maxRow, maxCol] = bbox(s);
  return [Math.floor((minRow + maxRow) / 2), Math.floor((minCol + maxCol) / 2)]
}

export function centered(s: Shape): Shape {
  const [cRow, cCol] = center(s);
  return s.map(([row, col]) => [row - cRow, col - cCol]);
}



// /*
//  * Copyright 2010 Hunter Freyer <yt@hjfreyer.com>
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *    http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */
//
// package com.hjfreyer.pentris.client.model;
//
// import java.util.HashMap;
// import java.util.HashSet;
// import java.util.Map;
// import java.util.Set;
//
// import com.hjfreyer.pentris.client.util.Pair;
//
// public class Shapes {
//
// 	public static Shape translated(Shape shape, int dx, int dy) {
// 		Set<Point> newPoints = new HashSet<Point>();
//
// 		for (Point p : shape.getPoints())
// 			newPoints.add(p.plus(dx, dy));
//
// 		return new Shape(newPoints);
// 	}
//
// 	public static Shape translatedTo(Shape shape, int x, int y) {
// 		Point center = shape.getCenter();
//
// 		return translated(shape, x - center.getX(), y - center.getY());
// 	}
//
// 	public static Shape translatedTo(Shape shape, Point p) {
// 		return translatedTo(shape, p.getX(), p.getY());
// 	}
//
// 	public static Shape rotatedRight(Shape shape) {
// 		Point center = shape.getCenter();
// 		Set<Point> newPoints = new HashSet<Point>();
//
// 		for (Point p : shape.getPoints()) {
// 			newPoints.add(new Point(-p.getY(), p.getX(), p.getColor()));
// 		}
//
// 		return translatedTo(new Shape(newPoints), center);
// 	}
//
// 	public static Shape rotatedLeft(Shape shape) {
// 		Point center = shape.getCenter();
// 		Set<Point> newPoints = new HashSet<Point>();
//
// 		for (Point p : shape.getPoints()) {
// 			newPoints.add(new Point(p.getY(), -p.getX(), p.getColor()));
// 		}
//
// 		return translatedTo(new Shape(newPoints), center);
// 	}
//
// 	public static Set<Point> mirrored(Set<Point> points) {
// 		Set<Point> newPoints = new HashSet<Point>();
//
// 		for (Point p : points) {
// 			newPoints.add(new Point(-p.getX(), p.getY(), p.getColor()));
// 		}
//
// 		return newPoints;
// 	}
//
// 	public static Shape mirrored(Shape s) {
// 		return new Shape(mirrored(s.getPoints()));
// 	}
//
// 	public static Pair<Shape, Integer> clear(Shape deadShape, int width) {
// 		Map<Integer, Integer> rowCount = new HashMap<Integer, Integer>();
// 		for (Point p : deadShape.getPoints()) {
// 			if (!rowCount.containsKey(p.getY())) {
// 				rowCount.put(p.getY(), 0);
// 			}
//
// 			rowCount.put(p.getY(), rowCount.get(p.getY()) + 1);
// 		}
//
// 		Set<Integer> clearedRows = new HashSet<Integer>();
// 		for (int row : rowCount.keySet()) {
// 			if (rowCount.get(row) == width) {
// 				clearedRows.add(row);
// 			}
// 		}
//
// 		Map<Integer, Integer> rowMap = new HashMap<Integer, Integer>();
// 		for (int row : rowCount.keySet()) {
// 			int shift = 0;
// 			for (int clearedRow : clearedRows) {
// 				if (clearedRow > row) {
// 					shift++;
// 				}
// 			}
//
// 			rowMap.put(row, row + shift);
// 		}
//
// 		Set<Point> newPoints = new HashSet<Point>();
// 		for (Point p : deadShape.getPoints()) {
// 			if (clearedRows.contains(p.getY())) {
// 				continue;
// 			}
// 			newPoints.add(new Point(p.getX(), rowMap.get(p.getY()), p.getColor()));
// 		}
//
// 		return Pair.of(new Shape(newPoints), clearedRows.size());
// 	}
//
// 	public static Shape union(Shape a, Shape b) {
// 		Set<Point> set = new HashSet<Point>();
//
// 		set.addAll(a.getPoints());
// 		set.addAll(b.getPoints());
//
// 		return new Shape(set);
// 	}
// }
