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

	//eleventyConfig.on('eleventy.after', () => {
		//execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
	//});

	eleventyConfig.addCollection('books-info', collection => {
		return collection.getAll()
			.filter(item => item.data.categories && item.data.categories.includes('books') && item.data.categories.includes('info'))
			.sort((a, b) => a.date - b.date)
	});

	eleventyConfig.addCollection('short-stories-info', collection => {
		return collection.getAll()
			.filter(item => item.data.categories && item.data.categories.includes('short-stories') && item.data.categories.includes('info'))
			.sort((a, b) => a.date - b.date)
	});

	eleventyConfig.addCollection('anthologies-info', collection => {
		return collection.getAll()
			.filter(item => item.data.categories && item.data.categories.includes('anthologies') && item.data.categories.includes('info'))
			.sort((a, b) => a.date - b.date);
	});

	eleventyConfig.addCollection('events', collection => {
		return collection.getAll().filter(item => item.data.categories && (
			item.data.categories.includes('reading') ||
			item.data.categories.includes('readings') ||
			item.data.categories.includes('appearances') ||
			item.data.categories.includes('events')));
	});

	eleventyConfig.addCollection('events-recorded', collection => {
		return collection.getAll()
			.filter(item => item.data.categories && item.data.categories.includes('recorded'))
			.sort((a, b) => a.date - b.date);
	});

	eleventyConfig.addCollection('writing-thoughts', collection => {
		return collection.getAll().filter(item =>
			item.data.categories &&
			item.data.categories.includes('writing-thoughts'))
			.sort((a, b) => a.date - b.date);
	});

	eleventyConfig.addCollection('interviews', collection => {
		return collection.getAll().filter(item =>
			item.data.categories &&
			(item.data.categories.includes('guest-post') ||
			item.data.categories.includes('blog-tour') ||
			item.data.categories.includes('interviews')))
			.sort((a, b) => a.date - b.date);
	});

	eleventyConfig.addCollection('archive', collection => {
		return collection.getAll().filter(item =>
			item.data.categories &&
			(item.data.categories.includes('announcements') ||
				item.data.categories.includes('publication-news') ||
				item.data.categories.includes('writing-snippets') ||
				item.data.categories.includes('blog-tours') ||
				item.data.categories.includes('event-writeups')))
			.sort((a, b) => a.date - b.date);
	});

	eleventyConfig.addCollection('misc', collection => {
		return collection.getAll().filter(item =>
			item.data.categories &&
			item.data.categories.includes('misc'))
			.sort((a, b) => a.date - b.date)
	});

	eleventyConfig.addCollection('reviews', collection => {
		return collection.getAll().filter(item =>
			item.data.categories &&
			item.data.categories.includes('reviews'))
			.sort((a, b) => a.date - b.date)
	});

	eleventyConfig.addCollection('essays', collection => {
		return collection.getAll().filter(item =>
			item.data.categories &&
			(item.data.categories.includes('essays')))
			.sort((a, b) => a.date - b.date)
	});


	eleventyConfig.addFilter("eventTime", (dateString) => {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return `${months[new Date(dateString).getUTCMonth()]} ${new Date(dateString).getUTCDate()}, ${new Date(dateString).getUTCFullYear()}`;
	});

	// Tags
	eleventyConfig.addCollection('tagList', collection => {
		const tagsSet = new Set();
		collection.getAll().forEach(item => {
			if (!item.data.tags) return;
			item.data.tags.filter(tag => !['posts', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
		});
		return Array.from(tagsSet).sort();
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
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

	eleventyConfig.addFilter("excerpt", (post) => {
		if (post.data.description) {
			return post.data.description;
		}
		const content = post.content.replace(/(<([^>]+)>)/gi, "");
		return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
	});

	eleventyConfig.addFilter("publicationDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n, reverse) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}

		if( n < 0 ) {
			return reverse ? array.slice(n).reverse() : array.slice(n);
		}

		return reverse ? array.slice(0, n).reverse() : array.slice(0, n);
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

	if (doc.data.coverImage) {
		return doc.data.coverImage;
	}

	if (content.includes('<img')) {
		const imgTagBegin = content.indexOf('<img');
		const imgTagEnd = content.indexOf('>', imgTagBegin);
		const imgTag = content.substring(imgTagBegin, imgTagEnd + 1);
		const uriBegin = imgTag.indexOf('src="');
		const uriEnd = imgTag.indexOf('"', uriBegin+5);
		return imgTag.substring(uriBegin+5, uriEnd);
	}

	return '/img/logo-no-imagefound.svg';
}
