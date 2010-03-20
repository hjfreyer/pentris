package com.hjfreyer.pentris.client;

public class TetrisPresenter {
	private final int width;
	private final int height;
	private final TetrisView mainView;
	private final ShapeFactory shapeFactory;

	public TetrisPresenter(
			int width,
			int height,
			TetrisView mainView,
			ShapeFactory shapeFactory) {
		this.width = width;
		this.height = height;
		this.mainView = mainView;
		this.shapeFactory = shapeFactory;
	}
}
