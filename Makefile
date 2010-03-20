all:
	javac pentris/PentrisApplet.java
clean:
	find .|grep [.]class$$ |xargs rm -f
	find .|grep ~$$ |xargs rm -f
	rm -rf pentris.jar
jar: clean all
	jar cf  pentris.jar pentris/