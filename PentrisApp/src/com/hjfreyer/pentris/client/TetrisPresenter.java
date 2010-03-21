package com.hjfreyer.pentris.client;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.google.gwt.user.client.Random;
import com.hjfreyer.pentris.client.model.Point;
import com.hjfreyer.pentris.client.model.Shape;
import com.hjfreyer.pentris.client.model.Shapes;
import com.hjfreyer.pentris.client.util.Pair;

public class TetrisPresenter implements TetrisEventListener {
	private final int width;
	private final int height;
	private final TetrisView mainView;
	private final List<Shape> shapeHeap;

	private Shape deadShape;
	private Shape activeShape;
	private Shape onDeckShape;
	private int score = 0;
	private boolean gameOver = false;

	public TetrisPresenter(
			int width,
			int height,
			TetrisView mainView,
			Set<Shape> shapeHeap) {

		this.width = width;
		this.height = height;
		this.mainView = mainView;
		this.shapeHeap = new ArrayList<Shape>(shapeHeap);

		init();
	}

	public void init() {
		deadShape = new Shape(new HashSet<Point>());
		onDeckShape = getRandomShape();
		activeShape = getRandomShape();
		activeShape =
				Shapes.translatedTo(
						activeShape,
						width / 2,
						-activeShape.getHeight() / 2);
	}

	public void step() {
		// If shape is settled
		if (Shapes.translated(activeShape, 0, 1).intersects(deadShape)
				|| activeShape.getMaxY() == height - 1) {
			deadShape = Shapes.union(deadShape, activeShape);

			activeShape = onDeckShape;
			onDeckShape = getRandomShape();

			Pair<Shape, Integer> cleared = Shapes.clear(deadShape, width);
			deadShape = cleared.getFirst();
			score += (int) Math.pow(2, cleared.getSecond()) - 1;

			activeShape =
					Shapes.translatedTo(
							activeShape,
							width / 2,
							-activeShape.getHeight() / 2);

			if (deadShape.intersects(activeShape))
				gameOver = true;
		} else {
			activeShape = Shapes.translated(activeShape, 0, 1);
		}

		redraw();
	}

	private void redraw() {
		Set<Shape> shapes = new HashSet<Shape>();
		shapes.add(activeShape);
		shapes.add(deadShape);

		mainView.showShapes(shapes);
	}

	public Shape getRandomShape() {
		return shapeHeap.get(Random.nextInt(shapeHeap.size()));
	}

	public boolean attemptTranslate(int dx, int dy) {
		Shape translated = Shapes.translated(activeShape, dx, dy);

		if (intersectsScenery(translated)) {
			return false;
		}

		activeShape = translated;
		return true;
	}

	public void attemptRotateRight() {
		Shape translated = Shapes.rotatedRight(activeShape);

		if (!intersectsScenery(translated)) {
			activeShape = translated;
			redraw();
		}
	}

	public boolean intersectsScenery(Shape s) {
		return s.intersects(deadShape) || !s.isInBounds(width, height);
	}

	@Override
	public void onDropped() {
		while (attemptTranslate(0, 1)) {
		}
		redraw();
	}

	@Override
	public void onMovedDown() {
		attemptTranslate(0, 1);
		redraw();
	}

	@Override
	public void onMovedLeft(boolean held) {
		if (held) {
			while (attemptTranslate(-1, 0)) {
			}
		} else {
			attemptTranslate(-1, 0);
		}
		redraw();
	}

	@Override
	public void onMovedRight(boolean held) {
		if (held) {
			while (attemptTranslate(1, 0)) {
			}
		} else {
			attemptTranslate(1, 0);
		}
		redraw();
	}

	@Override
	public void onPaused() {
		// TODO Auto-generated method stub

	}

	@Override
	public void onRotatedLeft() {
		// TODO Auto-generated method stub

	}

	@Override
	public void onRotatedRight() {
		attemptRotateRight();
		redraw();
	}

}
