import * as fs from 'fs';
import * as path from 'path';

delete require.cache[__filename];
const parentFile = module.parent && module.parent.filename;

const importer = ({
	dir,
	patterns = new Set(['.ts', '.js']),
	returnAs = 'object',
}: {
	dir: string;
	patterns?: Set<string>;
	returnAs?: 'array' | 'object';
}) => {
	let files;
	try {
		files = fs.readdirSync(dir);
	} catch (_) {
		return returnAs === 'array' ? [] : {};
	}

	const done = new Set();
	let modules;

	if (returnAs === 'array') {
		modules = [];
	} else {
		modules = {};
	}

	for (const pattern of patterns) {
		for (const file of files) {
			const filenameStem = path.basename(file).replace(pattern, '');

			const fullPath = path.join(dir, file);

			if (
				done.has(filenameStem) ||
				fullPath === parentFile ||
				!file.includes(pattern) ||
				filenameStem[0] === '_' ||
				filenameStem[0] === '.' ||
				filenameStem.indexOf('.') !== -1
			) {
				continue;
			}

			if (returnAs === 'array') {
				modules.push(require(fullPath));
			} else {
				modules[filenameStem] = require(fullPath);
			}
			done.add(filenameStem);
		}
	}
	console.log(modules);

	return modules;
};

export default importer;
