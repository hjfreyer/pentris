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

package com.hjfreyer.pentris.client;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.google.gwt.user.client.Random;
import com.hjfreyer.pentris.client.model.Point;
import com.hjfreyer.pentris.client.model.Shape;
import com.hjfreyer.pentris.client.model.Shapes;
import com.hjfreyer.pentris.client.util.Pair;
import com.hjfreyer.pentris.client.view.PiecePreviewView;
import com.hjfreyer.pentris.client.view.ScoreDisplay;
import com.hjfreyer.pentris.client.view.TetrisView;

public class TetrisPresenter implements TetrisEventListener {
	private final int width;
	private final int height;
	private final TetrisView mainView;
	private final PiecePreviewView preview;
	private final List<Shape> shapeHeap;
	private final Runnable gameOverHandler;
	private final ScoreDisplay scoreDisplay;

	private Shape deadShape;
	private Shape activeShape;
	private Shape onDeckShape;
	private int score = 0;
	private boolean paused = true;

	public TetrisPresenter(
			int width,
			int height,
			TetrisView mainView,
			PiecePreviewView preview,
			List<Shape> shapeHeap,
			Runnable gameOverHandler,
			ScoreDisplay scoreDisplay) {
		super();
		this.width = width;
		this.height = height;
		this.mainView = mainView;
		this.preview = preview;
		this.shapeHeap = shapeHeap;
		this.gameOverHandler = gameOverHandler;
		this.scoreDisplay = scoreDisplay;
	}

	public void reset() {
		score = 0;
		deadShape = new Shape(new HashSet<Point>());
		onDeckShape = getRandomShape();
		activeShape = null;
		paused = false;

		deployPiece();
	}

	public void step() {
		if (paused)
			return;
		// If shape is settled
		if (Shapes.translated(activeShape, 0, 1).intersects(deadShape)
				|| activeShape.getMaxY() == height - 1) {
			deadShape = Shapes.union(deadShape, activeShape);

			Pair<Shape, Integer> cleared = Shapes.clear(deadShape, width);
			deadShape = cleared.getFirst();
			score += (int) Math.pow(2, cleared.getSecond()) - 1;

			deployPiece();

			if (activeShape.intersects(deadShape)) {
				paused = true;
				gameOverHandler.run();
			}
		} else {
			activeShape = Shapes.translated(activeShape, 0, 1);
		}

		redraw();
	}

	private void deployPiece() {
		activeShape = onDeckShape;
		onDeckShape = getRandomShape();

		preview.previewPiece(onDeckShape);
		scoreDisplay.displayScore(score);

		activeShape =
				Shapes.translatedTo(activeShape, width / 2, -(int) Math
						.ceil(activeShape.getHeight() / 2.0));
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
		if (paused)
			return false;
		Shape translated = Shapes.translated(activeShape, dx, dy);

		if (intersectsScenery(translated)) {
			return false;
		}

		activeShape = translated;
		return true;
	}

	public void attemptRotateRight() {
		if (paused)
			return;
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
		step();
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
		paused = !paused;
	}

	@Override
	public void onReset() {
		reset();
	}

	@Override
	public void onRotatedRight() {
		attemptRotateRight();
		redraw();
	}

}
