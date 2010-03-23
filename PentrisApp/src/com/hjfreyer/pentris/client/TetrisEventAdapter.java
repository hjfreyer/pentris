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

import com.google.gwt.event.dom.client.KeyDownEvent;
import com.google.gwt.event.dom.client.KeyDownHandler;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;

public class TetrisEventAdapter
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

	public TetrisEventAdapter(TetrisEventListener tetrisListener) {
		this.tetrisListener = tetrisListener;
	}

	public void repeatKey() {
		// if (currentState == State.RIGHT) {
		// tetrisListener.onMovedRight(true);
		// }
		// if (currentState == State.LEFT) {
		// tetrisListener.onMovedLeft(true);
		// }
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
			if (currentState == State.LEFT) {
				tetrisListener.onMovedLeft(false);
			}
			if (currentState == State.RIGHT) {
				tetrisListener.onMovedRight(false);
				currentState = State.RIGHT;
			}
			if (currentState == State.DOWN) {
				currentState = State.DOWN;
				tetrisListener.onMovedDown();
			}
			if (currentState == State.UP) {
				tetrisListener.onRotatedRight();
				currentState = State.UP;
			}
			if (currentState == State.SPACE) {
				tetrisListener.onDropped();
				currentState = State.SPACE;
			}
		}

		if (event.getCharCode() == 'p') {
			tetrisListener.onPaused();
		}

		if (event.getCharCode() == 'n') {
			tetrisListener.onReset();
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
