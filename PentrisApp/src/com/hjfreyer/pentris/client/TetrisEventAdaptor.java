package com.hjfreyer.pentris.client;

import com.google.gwt.event.dom.client.KeyDownEvent;
import com.google.gwt.event.dom.client.KeyDownHandler;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;

public class TetrisEventAdaptor
		implements
		KeyDownHandler,
		KeyPressHandler,
		KeyUpHandler {
	private final TetrisEventListener tetrisListener;

	private boolean left = false;
	private boolean right = false;
	private boolean up = false;
	private boolean down = false;

	public TetrisEventAdaptor(TetrisEventListener tetrisListener) {
		this.tetrisListener = tetrisListener;
	}

	@Override
	public void onKeyDown(KeyDownEvent event) {
		if (event.isDownArrow()) {
			down = true;
		}

		if (event.isLeftArrow()) {
			left = true;
		}

		if (event.isRightArrow()) {
			right = true;
		}

		if (event.isUpArrow()) {
			up = true;
		}

		event.preventDefault();
	}

	@Override
	public void onKeyPress(KeyPressEvent event) {
		if (left) {
			tetrisListener.onMovedLeft();
		}
		if (right) {
			tetrisListener.onMovedRight();
		}
		if (down) {
			tetrisListener.onMovedDown();
		}
		if (up) {
			tetrisListener.onRotatedRight();
		}
		if (left || right || up || down) {
			event.preventDefault();
		}
	}

	@Override
	public void onKeyUp(KeyUpEvent event) {
		left = false;
		right = false;
		up = false;
		down = false;
	}
}
