package com.hjfreyer.pentris.client.view;

import java.util.HashSet;
import java.util.Set;

import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Grid;
import com.google.gwt.user.client.ui.Panel;
import com.hjfreyer.pentris.client.TetrisView;
import com.hjfreyer.pentris.client.model.Point;
import com.hjfreyer.pentris.client.model.Shape;
import com.hjfreyer.pentris.client.util.Color;

public class TableTetrisView extends Composite implements TetrisView {

	private final int width;
	private final int height;
	private final int cellWidth;
	private final int cellHeight;
	private final Color background;

	private final Grid grid;
	private final Panel[][] blocks;

	private Set<Shape> shapeCache = new HashSet<Shape>();

	public TableTetrisView(
			int width,
			int height,
			int cellWidth,
			int cellHeight,
			Color background) {
		super();
		this.width = width;
		this.height = height;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;
		this.background = background;

		grid = new Grid(height, width);
		blocks = new Panel[width][height];

		initGraphics();
	}

	public void initGraphics() {
		Panel p = new FlowPanel();
		initWidget(p);
		p.add(grid);

		grid.setCellPadding(0);
		grid.setCellSpacing(0);
		// grid.setBorderWidth(1);

		for (int i = 0; i < width * height; i++) {
			Panel block = new FlowPanel();

			block.setPixelSize(cellWidth, cellHeight);
			block
					.getElement()
					.getStyle()
					.setBackgroundColor(background.getHexValue());

			block.setStyleName("tetrisBlock");
			block.getElement().getStyle().setBorderColor(background.getHexValue());

			grid.setWidget(i / width, i % width, block);
			blocks[i % width][i / width] = block;
		}
	}

	@Override
	public void showShapes(Set<Shape> shapes) {
		for (Shape shape : shapeCache) {
			if (!shapes.contains(shape)) {
				// Old shape
				for (Point p : shape.getPoints()) {
					if (p.isInBounds(width, height)) {
						blocks[p.getX()][p.getY()]
								.getElement()
								.getStyle()
								.setBackgroundColor(background.getHexValue());
					}
				}
			}
		}

		for (Shape shape : shapes) {
			if (!shapeCache.contains(shape)) {
				// New shape
				for (Point p : shape.getPoints()) {
					if (p.isInBounds(width, height)) {
						blocks[p.getX()][p.getY()]
								.getElement()
								.getStyle()
								.setBackgroundColor(p.getColor().getHexValue());
					}
				}
			}
		}

		shapeCache = shapes;
	}

}
