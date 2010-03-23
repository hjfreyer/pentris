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

import java.util.HashSet;
import java.util.Set;

import com.hjfreyer.pentris.client.model.Shape;
import com.hjfreyer.pentris.client.model.Shapes;

public class PiecePreviewTetrisViewAdapter implements PiecePreviewView {
	private final TetrisView view;

	public PiecePreviewTetrisViewAdapter(TetrisView view) {
		this.view = view;
	}

	@Override
	public void previewPiece(Shape shape) {
		shape = bestPreviewRotate(shape);
		shape = Shapes.translatedTo(shape, 3, 2);
		Set<Shape> previewSet = new HashSet<Shape>();
		previewSet.add(shape);
		view.showShapes(previewSet);
	}

	private Shape bestPreviewRotate(Shape shape) {
		Shape rotated = Shapes.rotatedRight(shape);

		if (shape.getHeight() == 3) {
			return shape;
		}
		if (rotated.getHeight() == 3) {
			return rotated;
		}
		return shape.getHeight() < rotated.getHeight() ? shape : rotated;
	}
}
