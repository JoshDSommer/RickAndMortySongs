import * as app from 'application';
import * as fs from 'file-system';

export interface IMp3 {
	path: string;
	name: string;
}

export class MediaPlayer {
	public playlist: IMp3[];
	private mediaPlayer: any;
	public currentIndex: number;

	constructor() {
		this.playlist = [];
		this.currentIndex = 0;
	}

	loadMp3(index: number): void {
		let files = fs.knownFolders.currentApp();
		if (index >= this.playlist.length)
			index = 0;
		let mp3 = files.getFile(this.playlist[index].path);
		this.currentIndex = index;
		this.mediaPlayer = android.media.MediaPlayer.create(app.android.context, android.net.Uri.parse(mp3.path));
	}

	play(): void {
		if (this.mediaPlayer == null)
			this.loadMp3(0);

		this.mediaPlayer.start();
	}

	addToPlaylist(mp3: IMp3): void {
		this.playlist.push(mp3);
	}

	getDuration(): number {
		return this.mediaPlayer.getDuration();
	}
	getCurrentMp3(): IMp3 {
		return this.playlist[this.currentIndex];
	}
	getCurrentDuration(): number {
		return this.mediaPlayer.getCurrentDuration();
	}

	isPlaying(): boolean {
		return this.mediaPlayer.isPlaying();
	}

	reset(): void {
		this.mediaPlayer.reset();
	}

	pause(): void {
		this.mediaPlayer.pause();
	}
}
