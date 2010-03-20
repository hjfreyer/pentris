package com.hjfreyer.pentris.client;

import java.util.Set;

import com.hjfreyer.pentris.client.model.Shape;

public interface ShapeFactory {

	public abstract Set<Shape> getShapes();

}