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

	private State lastState = State.NONE;
	private State currentState = State.NONE;
	private final boolean held = false;

	public TetrisEventAdaptor(TetrisEventListener tetrisListener) {
		this.tetrisListener = tetrisListener;
	}

	@Override
	public void onKeyDown(KeyDownEvent event) {
		currentState = State.NONE;
		if (event.isLeftArrow()) {
			currentState = State.LEFT;
		}
		if (event.isRightArrow()) {
			currentState = State.RIGHT;
		}
		if (event.isDownArrow()) {
			currentState = State.DOWN;
		}
		if (event.isUpArrow()) {
			currentState = State.UP;
		}
		event.preventDefault();
	}

	@Override
	public void onKeyPress(KeyPressEvent event) {
		switch (currentState) {
		case DOWN:
			tetrisListener.onMovedDown();
			break;
		case LEFT:
			tetrisListener.onMovedLeft(lastState == State.LEFT);
			break;
		case NONE:
			break;
		case RIGHT:
			tetrisListener.onMovedRight(lastState == State.RIGHT);
			break;
		case UP:
			tetrisListener.onRotatedRight();
			break;
		}
		if (event.getCharCode() == ' ') {
			tetrisListener.onDropped();
		}
		lastState = currentState;
		event.preventDefault();
	}

	@Override
	public void onKeyUp(KeyUpEvent event) {
		lastState = State.NONE;
		currentState = State.NONE;
	}
}
