package com.hjfreyer.pentris.client;

public interface DelayStrategy {
	public int getDelayMillis(int score, int roundNum);
}
