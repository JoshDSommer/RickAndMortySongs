/*global require, exports, android*/
export interface IPaletteColor {
	vibrantRgb: string;
	vibrantBodyText: string;

	darkVibrantRgb: string;
	darkVibrantBodyText: string;

    lightVibrantRgb: string;
	lightVibrantBodyText: string;
}

export function MaterialPalette(imgArg): IPaletteColor {
	'use strict'

	let img = imgArg.android;
	let drawable = img.getDrawable();
	let bmp = drawable.getBitmap();
	let paletteColor: any = {};

	let Palette = new android.support.v7.graphics.Palette.from(bmp).generate();
	if (Palette != null) {
		let vibrantSwatch = Palette.getVibrantSwatch();
		paletteColor.vibrantRgb = vibrantSwatch.getRgb();
		paletteColor.vibrantBodyText = vibrantSwatch.getBodyTextColor();
		let darkVibrantSwatch = Palette.getDarkVibrantSwatch();
		paletteColor.darkVibrantRgb = darkVibrantSwatch.getRgb();
		paletteColor.darkVibrantBodyText = darkVibrantSwatch.getBodyTextColor();
		let lightVibrantSwatch = Palette.getLightVibrantSwatch();
		paletteColor.lightVibrantRgb = lightVibrantSwatch.getRgb();
		paletteColor.lightVibrantBodyText = lightVibrantSwatch.getBodyTextColor();
	}

	return paletteColor;
}
