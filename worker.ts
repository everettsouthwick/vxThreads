addEventListener("fetch", (event: FetchEvent) => {
	event.respondWith(buffer(event.request));
});

async function buffer(request: Request): Promise<Response> {
	const { pathname } = new URL(request.url);
	let url: string = pathname.slice(1);
	url = decodeURIComponent(url);

	const videoResponse: Response = await fetch(url, {
		method: "GET",
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
			"Accept": "video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5",
			"Accept-Language": "en-US,en;q=0.5",
			"Range": "bytes=0-",
			"Alt-Used": "scontent.cdninstagram.com",
			"Sec-Fetch-Dest": "video",
			"Sec-Fetch-Mode": "no-cors",
			"Sec-Fetch-Site": "cross-site"
		},
	})

	const responseInit: ResponseInit = {
		headers: {
			"Content-Length": videoResponse.headers.get("Content-Length"),
			"Content-Type": videoResponse.headers.get("Content-Type"),
			"Content-Disposition": 'attachment; filename="video.mp4"',
		}
	};

	return new Response(videoResponse.body, responseInit);
}

