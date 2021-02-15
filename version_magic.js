const crypto = require("crypto");
if (process.argv.length != 3) {
	console.error("Please provide a version number!");
	process.exit(1);
} else if (isNaN(process.argv[2]) || parseInt(process.argv[2]) < 0 || process.argv[2].includes(".")) {
	console.error("Please provided a version number - only positive integers are valid!");
	process.exit(1);
} else {
	const version_number = BigInt(process.argv[2].replace(".", "")).toString();
	const version_string = crypto.createHash("md5").update(version_number).digest("hex");
	let version_magic = 0;
	for (let i = 0; i < version_string.length; i++) {
		if (!isNaN(version_string[i])) {
			version_magic += parseInt(version_string[i]);
		} else {
			version_magic += version_string.charCodeAt(i);
		}
	}
	version_magic = BigInt(version_number + version_magic.toString()).toString(16);
	console.log(version_magic);
	process.exit(0);
}