package com.hjfreyer.pentris.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.dom.client.Style.Display;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.user.client.Timer;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.RootPanel;
import com.hjfreyer.pentris.client.util.Color;
import com.hjfreyer.pentris.client.view.LabelScoreDisplay;
import com.hjfreyer.pentris.client.view.TableTetrisView;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class PentrisApp implements EntryPoint {
	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		TableTetrisView mainView = new TableTetrisView(12, 24, 20, 20, Color.BLACK);
		TableTetrisView preview = new TableTetrisView(7, 5, 20, 20, Color.BLACK);
		LabelScoreDisplay score = new LabelScoreDisplay();

		Runnable gameOverCallback = new Runnable() {

			@Override
			public void run() {
				RootPanel.get("gameOverPopup").getElement().getStyle().setDisplay(
						Display.BLOCK);
			}
		};

		final TetrisPresenter presenter =
				new TetrisPresenter(12, 24, mainView, preview, PentrisShapeFactory
						.getShapes(), gameOverCallback, score);
		TetrisEventAdaptor handler = new TetrisEventAdaptor(presenter);

		Timer stepTimer = new Timer() {
			@Override
			public void run() {
				presenter.step();
			}
		};
		stepTimer.scheduleRepeating(500);

		FocusPanel focus = new FocusPanel();
		focus.add(mainView);

		RootPanel.get("tetrisGame").add(focus);
		RootPanel.get("piecePreview").add(preview);
		RootPanel.get("scorePanel").add(score);
		focus.addKeyDownHandler(handler);
		focus.addKeyPressHandler(handler);
		focus.addKeyUpHandler(handler);

		RootPanel.get("loadingScreen").getElement().getStyle().setDisplay(
				Display.NONE);

		focus.setFocus(true);

		focus.addKeyPressHandler(new KeyPressHandler() {
			@Override
			public void onKeyPress(KeyPressEvent event) {
				if (event.getCharCode() == 'n') {
					RootPanel.get("welcomePopup").getElement().getStyle().setDisplay(
							Display.NONE);
					RootPanel.get("gameOverPopup").getElement().getStyle().setDisplay(
							Display.NONE);
				}
			}
		});

	}
}
