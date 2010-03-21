package com.hjfreyer.pentris.client;

public interface TetrisEventListener {

	public void onRotatedRight();

	public void onRotatedLeft();

	public void onMovedLeft();

	public void onMovedRight();

	public void onMovedDown();

	public void onDropped();

	public void onPaused();
}
