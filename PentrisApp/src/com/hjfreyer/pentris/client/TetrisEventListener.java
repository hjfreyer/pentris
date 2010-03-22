package com.hjfreyer.pentris.client;

public interface TetrisEventListener {

	public void onRotatedRight();

	public void onMovedLeft(boolean held);

	public void onMovedRight(boolean held);

	public void onMovedDown();

	public void onDropped();

	public void onPaused();

	public void onReset();
}
