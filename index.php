<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <!--<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; connect-src 'self' http://10.0.2.2">-->
    <!--<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *">-->
    <!--<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'" />-->
    <!--<meta http-equiv="Content-Security-Policy" content="default-src gap://ready file://* *; style-src 'self' http://* https://* 'unsafe-inline'; script-src 'self' http://* https://* 'unsafe-inline' 'unsafe-eval'">-->
    <title>East Park 2</title>

    <!--<meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />-->
    <script src="assets/js/jquery-2.0.3.min.js" type="text/javascript"></script>
    <script src="assets/js/phaser.min.js" type="text/javascript"></script>


    <style>

	/* RESET */

	a, abbr, address, article, aside, audio, b, blockquote, body, button, canvas, 
	caption, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset,
	figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, hr, header, hgroup,
	html, i, iframe, img, input, ins, kbd, label, legend, li, mark, menu, nav, 
	object, ol, p, pre, q, samp, section, small, span, strong, sub, summary, 
	sup, table, tbody, td, textarea, tfoot, th, thead, time, tr, ul, var, video, *:after, *:before {
		margin: 0;
		padding: 0;
		outline: none;
		border: none;

		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	mark {
	  background-color: transparent;
	}

	ul, ol {
	  list-style-type: none;
	}

	table {
	  border-spacing: 0;
	  border-collapse: collapse;
	}
	caption, th {
	  text-align: left;
	}

	q:after, q:before {
	  content: "";
	}

	a {
		color: inherit;
	}

	body {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}
	body,html {
		height:100%;
		width: 100%;
	}

	/* END RESET */

	html {
		display: table;
		table-layout: fixed;
	}
    body {
        background-color: #000;
        color: #fff;
        display: table-cell;
        vertical-align: middle;
    }
    #game-content {
		margin: 0 auto;
		width: 100%;
		max-width: 800px;
		position: relative;
    }
    #game-content canvas {
		max-width: 100%;
		height: auto;
		margin-left: auto;
		margin-right: auto;
    }
    </style>
</head>

<body>
	<div id="game-content">
	</div>
    <!--<button id="full-screen" style="position: absolute; top: 100px; left: 40px; z-index: 9999;">Full Screen</button>-->
    <!--<script type="text/javascript" src="assets/js/cordova.js"></script>-->
    <script type="text/javascript" src="assets/js/main.js"></script>
    <!--<script type="text/javascript" src="cordova.js"></script>-->

    <script type="text/javascript" src="assets/js/index.js"></script>
    <script type="text/javascript">
        app.initialize();
    </script>
</body>
</html>