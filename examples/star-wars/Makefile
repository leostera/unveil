all:
	sass --update ./styles:./build
	browserify -o build/.bundle.js -v -d ./index.js
	mv build/.bundle.js build/bundle.js
