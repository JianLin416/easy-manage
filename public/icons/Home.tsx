export default function Home({ height }: { height: number }) {
	const heightPx = height.toString() + 'px'

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height={heightPx} viewBox="0 -960 960 960" width={heightPx} fill="#1A1A1D">
			<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
		</svg>
	)
}
