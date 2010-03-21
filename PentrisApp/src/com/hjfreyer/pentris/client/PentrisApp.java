package com.hjfreyer.pentris.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.Timer;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.Grid;
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
		FocusPanel focus = new FocusPanel();
		RootPanel.get("mainTetrisView").add(focus);

		Grid flow = new Grid(1, 2);
		focus.add(flow);

		TableTetrisView mainView = new TableTetrisView(12, 24, 20, 20, Color.BLACK);
		flow.setWidget(0, 0, mainView);

		TableTetrisView preview = new TableTetrisView(7, 5, 20, 20, Color.BLACK);
		flow.setWidget(0, 1, preview);

		final TetrisPresenter presenter =
				new TetrisPresenter(12, 24, mainView, preview, PentrisShapeFactory
						.getShapes());

		TetrisEventAdaptor handler = new TetrisEventAdaptor(presenter);
		focus.addKeyDownHandler(handler);
		focus.addKeyPressHandler(handler);
		focus.addKeyUpHandler(handler);

		Timer stepTimer = new Timer() {
			@Override
			public void run() {
				presenter.step();
			}
		};
		stepTimer.scheduleRepeating(1000);
	}
}
