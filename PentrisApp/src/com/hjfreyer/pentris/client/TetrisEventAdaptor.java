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

	enum State {
		NONE, UP, DOWN, LEFT, RIGHT, SPACE
	}

	private State currentState = State.NONE;
	private boolean held = false;

	public TetrisEventAdaptor(TetrisEventListener tetrisListener) {
		this.tetrisListener = tetrisListener;
	}

	public void repeatKey() {
		if (currentState == State.RIGHT) {
			tetrisListener.onMovedRight(true);
		}
		if (currentState == State.LEFT) {
			tetrisListener.onMovedLeft(true);
		}
	}

	@Override
	public void onKeyDown(KeyDownEvent event) {
		repeatKey();
		currentState = State.NONE;
		if (event.isLeftArrow()) {
			tetrisListener.onMovedLeft(false);
			currentState = State.LEFT;
		}
		if (event.isRightArrow()) {
			tetrisListener.onMovedRight(false);
			currentState = State.RIGHT;
		}
		if (event.isDownArrow()) {
			currentState = State.DOWN;
			tetrisListener.onMovedDown();
		}
		if (event.isUpArrow()) {
			tetrisListener.onRotatedRight();
			currentState = State.UP;
		}
		if (event.getNativeKeyCode() == ' ') {
			tetrisListener.onDropped();
			currentState = State.SPACE;
		}

		if (currentState != State.NONE) {
			event.preventDefault();
		}
	}

	@Override
	public void onKeyPress(KeyPressEvent event) {
		if (held) {
			repeatKey();
		}
		held = true;
		event.preventDefault();
	}

	@Override
	public void onKeyUp(KeyUpEvent event) {
		currentState = State.NONE;
		held = false;
	}
}
