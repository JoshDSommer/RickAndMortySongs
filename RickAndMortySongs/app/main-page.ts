/*global require, exports, android*/
import app = require('application');
import * as frame from 'ui/frame';
import * as fs from 'file-system';
import * as types from 'utils/types';
import * as palette from './utilities/palette';
import * as platformModule  from 'platform';
import * as color from 'color';
import * as Observable from 'data/observable';
import * as _MediaPlayer from './utilities/mediaPlayer';
import * as view from 'ui/core/view';
import * as imageSource from 'image-source';

let Color = color.Color;
let viewModel = new Observable.Observable({});
let context = app.android.context;
let mediaPlayer;
let coverImg;
let loaded = false;

export function pageLoaded(args) {
	if (!loaded) {
		let page = args.object;
		loaded = true;

		page.bindingContext = viewModel;

		let path = 'assets/mp3/';
		coverImg = view.getViewById(page, 'coverImg');
		mediaPlayer = new _MediaPlayer.MediaPlayer();

		mediaPlayer.addToPlaylist({ img: '~/assets/images/season.jpg', path: path + 'rickandmortytheme.mp3', name: "Rick and Morty Intro" });
		mediaPlayer.addToPlaylist({ img: '~/assets/images/app.jpg', path: path + 'RaM205.HeadBentOver.FullSong.mp3', name: "Head Bent Over" });
		mediaPlayer.addToPlaylist({ img: '~/assets/images/fart.jpg', path: path + 'RickandMorty.GoodbyeMoonmen.FullSong.mp3', name: 'Good Bye Moonmen' });
		mediaPlayer.addToPlaylist({ img: '~/assets/images/ricknmorty.jpg', path: path + 'RaM205.GetSchwifty.FullSong.mp3', name: 'Get Schwifty' });

		let currentMp3 = mediaPlayer.getCurrentMp3();
		viewModel.set("song", currentMp3);
		coverImg.imageSource = imageSource.fromFile(currentMp3.img);
		picLoaded(coverImg);
		mediaPlayer.play();
	}
}

export function tapEvent() {
	mediaPlayer.pause();
	mediaPlayer.reset();

	mediaPlayer.currentIndex += 1;
	mediaPlayer.loadMp3(mediaPlayer.currentIndex);
	// clean up after playback complete
	let currentMp3 = mediaPlayer.getCurrentMp3();
	viewModel.set("song", currentMp3);
	coverImg.imageSource = imageSource.fromFile(currentMp3.img);
	picLoaded(coverImg);
	mediaPlayer.play();
}

export function picLoaded(arg) {
	if (arg != null) {
		let imgPalette: palette.IPaletteColor = palette.MaterialPalette(arg)

		viewModel.set("vibrant", { color: new Color(imgPalette.vibrantRgb), textColor: imgPalette.vibrantBodyText });
		viewModel.set("darkVibrant", { color: new Color(imgPalette.darkVibrantRgb), textColor: imgPalette.darkVibrantBodyText });
		viewModel.set("lightVibrant", { color: new Color(imgPalette.lightVibrantRgb), textColor: imgPalette.lightVibrantBodyText });

		if (platformModule.device.sdkVersion >= "21") {
			try {
				let window = app.android.foregroundActivity.getWindow();
				window.setStatusBarColor(new color.Color(imgPalette.vibrantRgb).android);
				// window.setStatusBarColor(new Color(imgPalette.darkVibrantRgb).android);
			} catch (ex) {
				//if the window isn't available then try agian after 50ms. fixes color not set on initial load.
				//todo finda better way to do this.
				setTimeout(function() {
					let window = app.android.foregroundActivity.getWindow();
					window.setStatusBarColor(new color.Color(imgPalette.vibrantRgb).android);
				}, 50);
				console.log(ex);
			}
		}
	}
}