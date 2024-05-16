const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

const { execSync } = require('child_process')

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addShortcode('first_image', post => extractFirstImage(post));

	eleventyConfig.addGlobalData("filterByCommonCategories", (collection = [], ...requiredCategories) => {
			const filtered = collection.filter(post => {
				return haveCommonItems(post.data.categories, requiredCategories.flat());
			});
			return filtered;
	});

	eleventyConfig.on('eleventy.after', () => {
		execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
	});

	eleventyConfig.addFilter('sidebarSelector', categories => {
		if (haveCommonItems(categories, ['restaurants', 'ice-cream-parlors', 'bakeries', 'food-trucks'])) {
			return 'dining-out';
		}

		if (haveCommonItems(categories, ['coffee-shop', 'bakeries'])) {
			return 'cafe';
		}

		if (haveCommonItems(categories, ['spirits'])) {
			return 'spirits';
		}

		if (haveCommonItems(categories, ['wine'])) {
			return 'wine';
		}

		if (haveCommonItems(categories, ['bars and tasting rooms', 'distillery', 'brewery', 'mead'])) {
			return 'tasting-rooms';
		}

		if (haveCommonItems(categories, ['Bar', 'watering hole', 'nightlife', 'wine bar', 'cocktail review'])) {
			return 'nightlife-cocktails';
		}

		if (haveCommonItems(categories, ['travel-guide'])) {
			return 'travelogues';
		}

		return 'default';
	});

	eleventyConfig.addFilter("filterByTags", function(collection=[], ...requiredTags) {
		return collection.filter(post => {
		  return requiredTags.flat().every(tag => post.data.tags.includes(tag));
		});
	});

	eleventyConfig.addFilter("filterByCommonCategories", function(collection = [], ...requiredCategories) {
		const filtered = collection.filter(post => {
			return haveCommonItems(post.data.categories, requiredCategories.flat());
		});
		return filtered;
	});

	eleventyConfig.addFilter("filterByCommonTags", function(collection = [], ...requiredTags) {
		const filtered = collection.filter(post => {
			return haveCommonItems(post.data.tags, requiredTags.flat());
		});
		return filtered;
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
			output: "_site"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};

/**
 * @param {*} doc A real big object full of all sorts of information about a document.
 * @returns {String} the markup of the first image.
 */
function extractFirstImage(doc) {
	if (!doc.hasOwnProperty('templateContent')) {
		console.warn('❌ Failed to extract image: Document has no property `templateContent`.');
		return;
	}

	const content = doc.templateContent;

	if (content.includes('<img')) {
		const imgTagBegin = content.indexOf('<img');
		const imgTagEnd = content.indexOf('>', imgTagBegin);
		const imgTag = content.substring(imgTagBegin, imgTagEnd + 1);
		const uriBegin = imgTag.indexOf('src="');
		const uriEnd = imgTag.indexOf('"', uriBegin+5);
		return imgTag.substring(uriBegin+5, uriEnd);
	}

	return '';
}

const haveCommonItems = (arr1, arr2) => {
	const set1 = new Set(arr1);
	const commonItems = arr2.filter(item => set1.has(item));
	return commonItems.length > 0;
}
