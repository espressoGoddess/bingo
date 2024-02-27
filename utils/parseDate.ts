export default function parseDate(date: Date) {
	const completedAtDate = new Date(date);

	// Get month abbreviation
	const monthAbbreviation = completedAtDate.toLocaleString('en-us', { month: 'short' });

	// Get hours and minutes
	let hours = completedAtDate.getHours();
	const minutes = completedAtDate.getMinutes();

	// Convert hours to 12-hour format
	const amOrPm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12 || 12; // Convert 0 to 12 for midnight

	// Format the date and time string
	return `${monthAbbreviation} ${completedAtDate.getDate()} @ ${hours}:${minutes.toString().padStart(2, '0')}${amOrPm}`;
}
