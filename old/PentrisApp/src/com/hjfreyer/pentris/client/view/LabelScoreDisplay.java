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