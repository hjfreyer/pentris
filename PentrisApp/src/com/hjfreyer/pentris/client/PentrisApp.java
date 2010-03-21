package com.hjfreyer.pentris.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.Timer;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.RootPanel;
import com.hjfreyer.pentris.client.util.Color;
import com.hjfreyer.pentris.client.view.TableTetrisView;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class PentrisApp implements EntryPoint {
	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		FocusPanel wrapper = new FocusPanel();
		RootPanel.get("mainTetrisView").add(wrapper);

		TableTetrisView mainView = new TableTetrisView(12, 24, 20, 20, Color.BLACK);
		wrapper.add(mainView);

		final TetrisPresenter presenter =
				new TetrisPresenter(12, 24, mainView, PentrisShapeFactory.getShapes());

		TetrisEventAdaptor handler = new TetrisEventAdaptor(presenter);
		wrapper.addKeyDownHandler(handler);
		wrapper.addKeyPressHandler(handler);
		wrapper.addKeyUpHandler(handler);

		Timer stepTimer = new Timer() {
			@Override
			public void run() {
				presenter.step();
			}
		};
		stepTimer.scheduleRepeating(1000);
	}
}
