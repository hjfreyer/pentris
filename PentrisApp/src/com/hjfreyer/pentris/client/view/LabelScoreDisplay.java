package com.hjfreyer.pentris.client.view;

import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.Label;

public class LabelScoreDisplay extends Composite implements ScoreDisplay {
	private final Label label = new Label();

	public LabelScoreDisplay() {
		initWidget(label);
	}

	@Override
	public void displayScore(int score) {
		label.setText("" + score);
	}

}
